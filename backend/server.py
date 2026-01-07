from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
JWT_ALGORITHM = 'HS256'

# Models
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    phone: str
    name: str
    role: Literal['customer', 'shop_owner', 'delivery_agent']
    location: Optional[dict] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    phone: str
    name: str
    role: str
    location: Optional[dict] = None
    rating: float = 0.0
    total_reviews: int = 0
    created_at: str

class Shop(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    owner_id: str
    name: str
    description: str
    location: dict
    address: str
    phone: str
    rating: float = 0.0
    total_reviews: int = 0
    is_active: bool = True
    created_at: str

class ShopCreate(BaseModel):
    name: str
    description: str
    location: dict
    address: str
    phone: str

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    shop_id: str
    name: str
    description: str
    price: float
    category: str
    image_url: Optional[str] = None
    stock: int
    is_available: bool = True
    created_at: str

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: Optional[str] = None
    stock: int

class OrderItem(BaseModel):
    product_id: str
    product_name: str
    quantity: int
    price: float

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_id: str
    shop_id: str
    items: List[OrderItem]
    total_amount: float
    delivery_address: str
    delivery_location: dict
    status: str = 'pending'
    delivery_agent_id: Optional[str] = None
    created_at: str
    updated_at: str

class OrderCreate(BaseModel):
    shop_id: str
    items: List[OrderItem]
    delivery_address: str
    delivery_location: dict

class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    reviewer_id: str
    target_id: str
    target_type: Literal['shop', 'delivery_agent']
    rating: int
    comment: str
    created_at: str

class ReviewCreate(BaseModel):
    target_id: str
    target_type: Literal['shop', 'delivery_agent']
    rating: int
    comment: str

# Helper Functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(user_id: str, role: str) -> str:
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.now(timezone.utc) + timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get('user_id')
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Auth Routes
@api_router.post("/auth/register")
async def register(data: UserRegister):
    existing = await db.users.find_one({"email": data.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = User(
        email=data.email,
        phone=data.phone,
        name=data.name,
        role=data.role,
        location=data.location,
        created_at=datetime.now(timezone.utc).isoformat()
    )
    
    user_dict = user.model_dump()
    user_dict['password'] = hash_password(data.password)
    
    await db.users.insert_one(user_dict)
    token = create_token(user.id, user.role)
    
    return {"user": user.model_dump(), "token": token}

@api_router.post("/auth/login")
async def login(data: UserLogin):
    user = await db.users.find_one({"email": data.email}, {"_id": 0})
    if not user or not verify_password(data.password, user['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(user['id'], user['role'])
    user.pop('password', None)
    
    return {"user": user, "token": token}

@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    current_user.pop('password', None)
    return current_user

# Shop Routes
@api_router.post("/shops", response_model=Shop)
async def create_shop(data: ShopCreate, current_user: dict = Depends(get_current_user)):
    if current_user['role'] != 'shop_owner':
        raise HTTPException(status_code=403, detail="Only shop owners can create shops")
    
    shop = Shop(
        owner_id=current_user['id'],
        name=data.name,
        description=data.description,
        location=data.location,
        address=data.address,
        phone=data.phone,
        created_at=datetime.now(timezone.utc).isoformat()
    )
    
    await db.shops.insert_one(shop.model_dump())
    return shop

@api_router.get("/shops")
async def get_shops(lat: Optional[float] = None, lng: Optional[float] = None):
    shops = await db.shops.find({"is_active": True}, {"_id": 0}).to_list(1000)
    return shops

@api_router.get("/shops/{shop_id}")
async def get_shop(shop_id: str):
    shop = await db.shops.find_one({"id": shop_id}, {"_id": 0})
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    return shop

@api_router.get("/shops/owner/my-shops")
async def get_my_shops(current_user: dict = Depends(get_current_user)):
    if current_user['role'] != 'shop_owner':
        raise HTTPException(status_code=403, detail="Not authorized")
    shops = await db.shops.find({"owner_id": current_user['id']}, {"_id": 0}).to_list(1000)
    return shops

# Product Routes
@api_router.post("/products", response_model=Product)
async def create_product(data: ProductCreate, shop_id: str, current_user: dict = Depends(get_current_user)):
    if current_user['role'] != 'shop_owner':
        raise HTTPException(status_code=403, detail="Only shop owners can create products")
    
    shop = await db.shops.find_one({"id": shop_id, "owner_id": current_user['id']}, {"_id": 0})
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found or not authorized")
    
    product = Product(
        shop_id=shop_id,
        name=data.name,
        description=data.description,
        price=data.price,
        category=data.category,
        image_url=data.image_url,
        stock=data.stock,
        created_at=datetime.now(timezone.utc).isoformat()
    )
    
    await db.products.insert_one(product.model_dump())
    return product

@api_router.get("/products")
async def get_products(shop_id: Optional[str] = None):
    query = {"is_available": True}
    if shop_id:
        query["shop_id"] = shop_id
    products = await db.products.find(query, {"_id": 0}).to_list(1000)
    return products

@api_router.put("/products/{product_id}")
async def update_product(product_id: str, data: ProductCreate, current_user: dict = Depends(get_current_user)):
    if current_user['role'] != 'shop_owner':
        raise HTTPException(status_code=403, detail="Not authorized")
    
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    shop = await db.shops.find_one({"id": product['shop_id'], "owner_id": current_user['id']}, {"_id": 0})
    if not shop:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    await db.products.update_one({"id": product_id}, {"$set": data.model_dump()})
    return {"message": "Product updated successfully"}

# Order Routes
@api_router.post("/orders", response_model=Order)
async def create_order(data: OrderCreate, current_user: dict = Depends(get_current_user)):
    if current_user['role'] != 'customer':
        raise HTTPException(status_code=403, detail="Only customers can place orders")
    
    total = sum(item.price * item.quantity for item in data.items)
    
    order = Order(
        customer_id=current_user['id'],
        shop_id=data.shop_id,
        items=[item.model_dump() for item in data.items],
        total_amount=total,
        delivery_address=data.delivery_address,
        delivery_location=data.delivery_location,
        created_at=datetime.now(timezone.utc).isoformat(),
        updated_at=datetime.now(timezone.utc).isoformat()
    )
    
    await db.orders.insert_one(order.model_dump())
    return order

@api_router.get("/orders")
async def get_orders(current_user: dict = Depends(get_current_user)):
    query = {}
    if current_user['role'] == 'customer':
        query['customer_id'] = current_user['id']
    elif current_user['role'] == 'shop_owner':
        shops = await db.shops.find({"owner_id": current_user['id']}, {"_id": 0}).to_list(1000)
        shop_ids = [shop['id'] for shop in shops]
        query['shop_id'] = {"$in": shop_ids}
    elif current_user['role'] == 'delivery_agent':
        query['delivery_agent_id'] = current_user['id']
    
    orders = await db.orders.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return orders

@api_router.get("/orders/{order_id}")
async def get_order(order_id: str, current_user: dict = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if current_user['role'] == 'customer' and order['customer_id'] != current_user['id']:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    return order

@api_router.put("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: str, current_user: dict = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if current_user['role'] == 'delivery_agent' and order.get('delivery_agent_id') != current_user['id']:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    await db.orders.update_one(
        {"id": order_id},
        {"$set": {"status": status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    return {"message": "Order status updated"}

@api_router.put("/orders/{order_id}/assign")
async def assign_delivery_agent(order_id: str, agent_id: str, current_user: dict = Depends(get_current_user)):
    if current_user['role'] != 'shop_owner':
        raise HTTPException(status_code=403, detail="Only shop owners can assign delivery agents")
    
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    shop = await db.shops.find_one({"id": order['shop_id'], "owner_id": current_user['id']}, {"_id": 0})
    if not shop:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    agent = await db.users.find_one({"id": agent_id, "role": "delivery_agent"}, {"_id": 0})
    if not agent:
        raise HTTPException(status_code=404, detail="Delivery agent not found")
    
    await db.orders.update_one(
        {"id": order_id},
        {"$set": {"delivery_agent_id": agent_id, "status": "assigned", "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    return {"message": "Delivery agent assigned"}

# Delivery Agent Routes
@api_router.get("/delivery-agents")
async def get_delivery_agents(current_user: dict = Depends(get_current_user)):
    if current_user['role'] != 'shop_owner':
        raise HTTPException(status_code=403, detail="Not authorized")
    agents = await db.users.find({"role": "delivery_agent"}, {"_id": 0, "password": 0}).to_list(1000)
    return agents

# Review Routes
@api_router.post("/reviews", response_model=Review)
async def create_review(data: ReviewCreate, current_user: dict = Depends(get_current_user)):
    if current_user['role'] != 'customer':
        raise HTTPException(status_code=403, detail="Only customers can leave reviews")
    
    review = Review(
        reviewer_id=current_user['id'],
        target_id=data.target_id,
        target_type=data.target_type,
        rating=data.rating,
        comment=data.comment,
        created_at=datetime.now(timezone.utc).isoformat()
    )
    
    await db.reviews.insert_one(review.model_dump())
    
    # Update rating
    collection = db.shops if data.target_type == 'shop' else db.users
    reviews = await db.reviews.find({"target_id": data.target_id}, {"_id": 0}).to_list(1000)
    avg_rating = sum(r['rating'] for r in reviews) / len(reviews)
    
    await collection.update_one(
        {"id": data.target_id},
        {"$set": {"rating": avg_rating, "total_reviews": len(reviews)}}
    )
    
    return review

@api_router.get("/reviews/{target_id}")
async def get_reviews(target_id: str):
    reviews = await db.reviews.find({"target_id": target_id}, {"_id": 0}).to_list(1000)
    return reviews

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()