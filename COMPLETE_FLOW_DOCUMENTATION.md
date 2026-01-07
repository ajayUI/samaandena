# SamaanDena Platform - Complete User Flow & Feature Documentation

**Version:** 1.0  
**Last Updated:** January 2025  
**Platform Type:** Multi-Role Delivery Management System

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [User Roles & Capabilities](#2-user-roles--capabilities)
3. [Customer Journey & Features](#3-customer-journey--features)
4. [Shop Owner Journey & Features](#4-shop-owner-journey--features)
5. [Delivery Agent Journey & Features](#5-delivery-agent-journey--features)
6. [Core Features Detailed](#6-core-features-detailed)
7. [Technical Workflow](#7-technical-workflow)
8. [Database & Data Flow](#8-database--data-flow)
9. [Security & Authentication](#9-security--authentication)
10. [Business Logic & Rules](#10-business-logic--rules)

---

## 1. Platform Overview

### 1.1 What is SamaanDena?

SamaanDena is a comprehensive local goods delivery platform designed specifically for rural areas. It connects three key stakeholders in the local commerce ecosystem:

- **Customers** - Residents who want to order goods from local shops
- **Shop Owners** - Local shopkeepers who want to reach more customers
- **Delivery Agents** - Community members who deliver orders

### 1.2 Core Problem Solved

**Problem:** In rural areas, accessing local shops can be challenging due to distance, limited mobility, or time constraints. Shop owners struggle to reach customers beyond their immediate vicinity, and there's no organized system for deliveries.

**Solution:** SamaanDena provides:
- A digital catalog of local shops and their products
- Easy ordering system with cash on delivery
- Community-based delivery network
- Real-time order tracking
- Trust-building through ratings and reviews

### 1.3 Key Benefits

**For Customers:**
- Browse multiple shops from home
- Order multiple items at once
- Track delivery in real-time
- Pay cash on delivery (no online payment needed)
- Rate and review shops and delivery agents

**For Shop Owners:**
- Reach customers beyond physical store
- Manage inventory digitally
- Track orders efficiently
- Assign trusted delivery agents
- Build reputation through reviews

**For Delivery Agents:**
- Earn income from local deliveries
- Flexible work opportunities
- Clear delivery assignments
- Build reputation in community
- Simple status updates

### 1.4 Platform Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SamaanDena Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │   Customer   │  │  Shop Owner  │  │ Delivery Agent  │ │
│  │  Dashboard   │  │   Dashboard  │  │   Dashboard     │ │
│  └──────┬───────┘  └──────┬───────┘  └────────┬────────┘ │
│         │                  │                    │          │
│         └──────────────────┴────────────────────┘          │
│                            │                               │
│                    ┌───────▼────────┐                      │
│                    │  API Gateway   │                      │
│                    │   (FastAPI)    │                      │
│                    └───────┬────────┘                      │
│                            │                               │
│         ┌──────────────────┴──────────────────┐           │
│         │                                      │           │
│  ┌──────▼──────┐                      ┌───────▼───────┐   │
│  │ Auth System │                      │  Order System │   │
│  │   (JWT)     │                      │   (MongoDB)   │   │
│  └─────────────┘                      └───────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. User Roles & Capabilities

### 2.1 Customer Role

**Primary Purpose:** Order goods from local shops

**Capabilities:**
- ✅ Browse all active shops in the system
- ✅ View shop details and ratings
- ✅ Browse products by shop
- ✅ Add products to shopping cart
- ✅ Remove products from cart
- ✅ Place orders with delivery address
- ✅ View order history
- ✅ Track real-time order status
- ✅ Rate and review shops
- ✅ Rate and review delivery agents
- ✅ Set delivery location (manual or auto-detect)
- ✅ Manage profile

**Restrictions:**
- ❌ Cannot create shops
- ❌ Cannot add products
- ❌ Cannot assign delivery agents
- ❌ Cannot update order status

### 2.2 Shop Owner Role

**Primary Purpose:** Manage shops and fulfill orders

**Capabilities:**
- ✅ Create multiple shops
- ✅ Edit shop details
- ✅ Add products to shops
- ✅ Edit product details (price, stock, availability)
- ✅ View all incoming orders
- ✅ Assign delivery agents to orders
- ✅ View assigned delivery agents
- ✅ View shop ratings and reviews
- ✅ Manage inventory
- ✅ Track order fulfillment

**Restrictions:**
- ❌ Cannot place orders as customer
- ❌ Cannot update delivery status
- ❌ Cannot see other shops' orders
- ❌ Cannot modify customer information

### 2.3 Delivery Agent Role

**Primary Purpose:** Deliver orders from shops to customers

**Capabilities:**
- ✅ View assigned deliveries
- ✅ See delivery details (items, address, amount)
- ✅ Update delivery status (picked up, delivered)
- ✅ View delivery history
- ✅ View personal rating and reviews
- ✅ Track active and completed deliveries

**Restrictions:**
- ❌ Cannot create shops
- ❌ Cannot add products
- ❌ Cannot assign themselves to orders
- ❌ Cannot place orders as customer
- ❌ Cannot see unassigned orders

---

## 3. Customer Journey & Features

### 3.1 Customer Registration Flow

**Step 1: Access Registration Page**
- Customer visits the website
- Clicks "Get Started" or "Login" button
- Selects "Register" tab

**Step 2: Fill Registration Form**

Required Information:
```
- Full Name: [Text Input]
- Email: [Email Input]
- Phone Number: [Phone Input]
- Password: [Password Input]
- Role Selection: [Radio Button] → Select "Customer"
- Delivery Location: [Location Picker]
  - Manual entry: Type address
  - Auto-detect: Click "Auto" button (uses browser geolocation)
```

**Step 3: Account Creation**
- Backend validates all inputs
- Email uniqueness is checked
- Password is hashed using bcrypt
- User record is created in database
- JWT token is generated
- User is automatically logged in
- Redirected to Customer Dashboard

**Technical Flow:**
```
POST /api/auth/register
Request Body:
{
  "email": "customer@example.com",
  "password": "securepass123",
  "phone": "+1234567890",
  "name": "John Customer",
  "role": "customer",
  "location": {
    "address": "123 Main St, Rural Town",
    "lat": 12.34,
    "lng": 56.78
  }
}

Response:
{
  "user": {
    "id": "uuid-1234",
    "email": "customer@example.com",
    "name": "John Customer",
    "role": "customer",
    "location": {...},
    "rating": 0,
    "total_reviews": 0,
    "created_at": "2025-01-07T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 3.2 Customer Login Flow

**Step 1: Access Login Page**
- Customer visits the website
- Clicks "Login" button
- Stays on "Login" tab

**Step 2: Enter Credentials**
```
- Email: [Email Input]
- Password: [Password Input]
```

**Step 3: Authentication**
- Backend verifies email exists
- Password is validated against hashed version
- JWT token is generated (valid for 7 days)
- User is redirected to dashboard

**Technical Flow:**
```
POST /api/auth/login
Request Body:
{
  "email": "customer@example.com",
  "password": "securepass123"
}

Response:
{
  "user": { ...user details... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

Token is stored in:
- localStorage (key: "token")
- Used in Authorization header for all API calls
```

### 3.3 Browsing Shops

**Dashboard View:**

When customer logs in, they see:

```
┌─────────────────────────────────────────────────────┐
│  Welcome, John!                                     │
│  Browse shops and order your daily essentials       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [Location Selector]                                │
│  📍 Current: 123 Main St, Rural Town    [Auto]     │
│                                                     │
│  [Cart (0)] [My Orders]                            │
│                                                     │
│  Local Shops:                                       │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐               │
│  │  🏪          │  │  🏪          │               │
│  │  Fresh       │  │  Daily       │               │
│  │  Groceries   │  │  Essentials  │               │
│  │              │  │              │               │
│  │  ⭐⭐⭐⭐⭐   │  │  ⭐⭐⭐⭐☆   │               │
│  │  (24 reviews)│  │  (18 reviews)│               │
│  │              │  │              │               │
│  │  📍 0.5km    │  │  📍 1.2km    │               │
│  └──────────────┘  └──────────────┘               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Shop Card Information:**
- Shop name
- Shop icon/image
- Rating (stars)
- Number of reviews
- Distance from customer (if location available)
- Click to view products

**Technical Flow:**
```
GET /api/shops
Query Parameters:
- lat: 12.34 (optional)
- lng: 56.78 (optional)

Response:
[
  {
    "id": "shop-uuid-1",
    "name": "Fresh Groceries Store",
    "description": "Fresh vegetables and daily essentials",
    "address": "456 Market St",
    "phone": "+1234567890",
    "rating": 4.5,
    "total_reviews": 24,
    "is_active": true,
    "location": {
      "address": "456 Market St",
      "lat": 12.35,
      "lng": 56.79
    }
  }
]
```

### 3.4 Viewing Products

**When customer clicks on a shop:**

Dialog/Modal opens showing products:

```
┌─────────────────────────────────────────────────────┐
│  Fresh Groceries Store                         [×]  │
│  ⭐⭐⭐⭐⭐ (24 reviews)                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Products:                                          │
│                                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │ 🍅      │  │ 🥛      │  │ 🍚      │           │
│  │ Tomatoes│  │ Milk    │  │ Rice    │           │
│  │         │  │         │  │         │           │
│  │ ₹50     │  │ ₹60     │  │ ₹80/kg  │           │
│  │         │  │         │  │         │           │
│  │ Stock:  │  │ Stock:  │  │ Stock:  │           │
│  │ 100     │  │ 50      │  │ 200kg   │           │
│  │         │  │         │  │         │           │
│  │ [Add]   │  │ [Add]   │  │ [Add]   │           │
│  └─────────┘  └─────────┘  └─────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Product Card Information:**
- Product image (if available)
- Product name
- Price
- Stock availability
- "Add to Cart" button

**Technical Flow:**
```
GET /api/products?shop_id=shop-uuid-1

Response:
[
  {
    "id": "product-uuid-1",
    "shop_id": "shop-uuid-1",
    "name": "Fresh Tomatoes",
    "description": "Locally grown organic tomatoes",
    "price": 50.0,
    "category": "Vegetables",
    "stock": 100,
    "is_available": true,
    "image_url": null,
    "created_at": "2025-01-07T09:00:00Z"
  }
]
```

### 3.5 Adding to Cart

**Customer clicks "Add to Cart" button:**

**Frontend Logic:**
```javascript
// Cart state management
const [cart, setCart] = useState([]);

function addToCart(product) {
  // Check if product already in cart
  const existing = cart.find(item => item.product_id === product.id);
  
  if (existing) {
    // Increment quantity
    setCart(cart.map(item =>
      item.product_id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  } else {
    // Add new item
    setCart([...cart, {
      product_id: product.id,
      product_name: product.name,
      quantity: 1,
      price: product.price
    }]);
  }
  
  // Show success notification
  toast.success(`${product.name} added to cart`);
}
```

**Cart is stored in:**
- Component state (in memory)
- Lost on page refresh (intentional - prevents stale cart)

**Cart Display:**
```
Cart (3)
├── Tomatoes x2 = ₹100
├── Milk x1 = ₹60
└── Rice x1 = ₹80
    
Total: ₹240
```

### 3.6 Placing an Order

**Step 1: Customer clicks "Cart" button**

Cart modal opens showing:
```
┌─────────────────────────────────────────────────────┐
│  Your Cart                                     [×]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Fresh Tomatoes                                     │
│  ₹50 x 2                               ₹100  [×]    │
│                                                     │
│  Fresh Milk                                         │
│  ₹60 x 1                                ₹60  [×]    │
│                                                     │
│  Rice                                               │
│  ₹80 x 1                                ₹80  [×]    │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Total:                                      ₹240   │
│                                                     │
│  [Place Order (Cash on Delivery)]                   │
└─────────────────────────────────────────────────────┘
```

**Step 2: Customer reviews items**
- Can remove items by clicking [×]
- Sees total amount

**Step 3: Customer clicks "Place Order"**

**Validation:**
```javascript
function placeOrder() {
  // Check location is set
  if (!location) {
    toast.error('Please set your delivery location');
    return;
  }
  
  // Check cart is not empty
  if (cart.length === 0) {
    toast.error('Cart is empty');
    return;
  }
  
  // Calculate total
  const total = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );
  
  // Create order
  createOrder();
}
```

**Technical Flow:**
```
POST /api/orders
Headers:
  Authorization: Bearer <token>
  
Request Body:
{
  "shop_id": "shop-uuid-1",
  "items": [
    {
      "product_id": "product-uuid-1",
      "product_name": "Fresh Tomatoes",
      "quantity": 2,
      "price": 50.0
    },
    {
      "product_id": "product-uuid-2",
      "product_name": "Fresh Milk",
      "quantity": 1,
      "price": 60.0
    }
  ],
  "delivery_address": "123 Main St, Rural Town",
  "delivery_location": {
    "lat": 12.34,
    "lng": 56.78
  }
}

Response:
{
  "id": "order-uuid-1",
  "customer_id": "user-uuid-1",
  "shop_id": "shop-uuid-1",
  "items": [...],
  "total_amount": 240.0,
  "delivery_address": "123 Main St, Rural Town",
  "status": "pending",
  "delivery_agent_id": null,
  "created_at": "2025-01-07T10:30:00Z"
}
```

**Step 4: Order Confirmation**
- Success message displayed
- Cart is cleared
- Customer redirected to orders view

### 3.7 Tracking Orders

**Customer clicks "My Orders" button:**

```
┌─────────────────────────────────────────────────────┐
│  My Orders                                     [×]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Order #1234                        [PENDING]       │
│  ₹240                                               │
│  Items: Fresh Tomatoes, Fresh Milk, Rice           │
│  Delivery to: 123 Main St                          │
│  Placed: Jan 7, 2025, 10:30 AM                     │
│                                                     │
│  ─────────────────────────────────────────────     │
│                                                     │
│  Order #1233                        [DELIVERED]     │
│  ₹180                                               │
│  Items: Vegetables                                  │
│  Delivered: Jan 6, 2025, 5:00 PM                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Order Status Indicators:**

| Status | Color | Icon | Meaning |
|--------|-------|------|---------|
| pending | Yellow | ⏳ | Order placed, awaiting shop owner action |
| assigned | Blue | 📋 | Delivery agent assigned |
| picked_up | Purple | 📦 | Agent picked up from shop |
| delivered | Green | ✅ | Order delivered successfully |

**Status Progression:**
```
pending → assigned → picked_up → delivered
```

**Technical Flow:**
```
GET /api/orders
Headers:
  Authorization: Bearer <token>

Response:
[
  {
    "id": "order-uuid-1",
    "customer_id": "user-uuid-1",
    "shop_id": "shop-uuid-1",
    "items": [...],
    "total_amount": 240.0,
    "delivery_address": "123 Main St, Rural Town",
    "status": "pending",
    "delivery_agent_id": null,
    "created_at": "2025-01-07T10:30:00Z",
    "updated_at": "2025-01-07T10:30:00Z"
  }
]
```

### 3.8 Rating and Reviews (Feature)

**When order is delivered:**

Customer can rate and review:

```
┌─────────────────────────────────────────────────────┐
│  Rate Your Experience                               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Rate the Shop:                                     │
│  ⭐⭐⭐⭐⭐                                           │
│                                                     │
│  Comment:                                           │
│  [Text area for review]                             │
│                                                     │
│  Rate the Delivery Agent:                           │
│  ⭐⭐⭐⭐⭐                                           │
│                                                     │
│  Comment:                                           │
│  [Text area for review]                             │
│                                                     │
│  [Submit Review]                                    │
└─────────────────────────────────────────────────────┘
```

**Technical Flow:**
```
POST /api/reviews
Headers:
  Authorization: Bearer <token>

Request Body:
{
  "target_id": "shop-uuid-1",
  "target_type": "shop",
  "rating": 5,
  "comment": "Great products and fast service!"
}

Response:
{
  "id": "review-uuid-1",
  "reviewer_id": "user-uuid-1",
  "target_id": "shop-uuid-1",
  "target_type": "shop",
  "rating": 5,
  "comment": "Great products and fast service!",
  "created_at": "2025-01-07T18:00:00Z"
}

// Backend automatically updates shop/agent rating
```

---

## 4. Shop Owner Journey & Features

### 4.1 Shop Owner Registration

**Similar to customer registration with role = "shop_owner"**

**Additional considerations:**
- Shop owner should provide business phone
- Location is important for shop visibility
- Can register even without a shop (create shop later)

### 4.2 Creating a Shop

**Step 1: Access Shop Creation**
- Shop owner logs in
- If no shops exist, sees prompt: "Create your first shop"
- Clicks "Create Shop" or "Add Shop" button

**Step 2: Fill Shop Form**

```
┌─────────────────────────────────────────────────────┐
│  Create New Shop                               [×]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Shop Name: *                                       │
│  [My Fresh Groceries]                              │
│                                                     │
│  Description: *                                     │
│  [We sell fresh vegetables, fruits, and daily      │
│   essentials...]                                    │
│                                                     │
│  Phone: *                                           │
│  [+1234567890]                                     │
│                                                     │
│  Address: *                                         │
│  [456 Market Street, Rural Town]                   │
│                                                     │
│  Location: *                                        │
│  📍 [Enter address]              [Auto]            │
│                                                     │
│  [Create Shop]                                      │
└─────────────────────────────────────────────────────┘
```

**Required Fields:**
- Shop Name
- Description
- Phone
- Address
- Location (lat/lng)

**Technical Flow:**
```
POST /api/shops
Headers:
  Authorization: Bearer <token>

Request Body:
{
  "name": "Fresh Groceries Store",
  "description": "We sell fresh vegetables, fruits, and daily essentials",
  "phone": "+1234567890",
  "address": "456 Market Street, Rural Town",
  "location": {
    "address": "456 Market Street, Rural Town",
    "lat": 12.35,
    "lng": 56.79
  }
}

Response:
{
  "id": "shop-uuid-1",
  "owner_id": "user-uuid-2",
  "name": "Fresh Groceries Store",
  "description": "We sell fresh vegetables...",
  "location": {...},
  "address": "456 Market Street",
  "phone": "+1234567890",
  "rating": 0,
  "total_reviews": 0,
  "is_active": true,
  "created_at": "2025-01-07T09:00:00Z"
}
```

**Step 3: Shop Created**
- Success message
- Shop appears in shop owner's dashboard
- Shop is now visible to customers

### 4.3 Adding Products

**Step 1: Access Product Creation**
- Shop owner is in dashboard
- Shop is selected
- Clicks "Add Product" button

**Step 2: Fill Product Form**

```
┌─────────────────────────────────────────────────────┐
│  Add Product                                   [×]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Product Name: *                                    │
│  [Fresh Tomatoes]                                  │
│                                                     │
│  Description: *                                     │
│  [Locally grown organic tomatoes]                  │
│                                                     │
│  Price (₹): *                                       │
│  [50.00]                                           │
│                                                     │
│  Stock: *                                           │
│  [100]                                             │
│                                                     │
│  Category: *                                        │
│  [Vegetables]                                      │
│                                                     │
│  Image URL: (optional)                              │
│  [https://...]                                     │
│                                                     │
│  [Add Product]                                      │
└─────────────────────────────────────────────────────┘
```

**Required Fields:**
- Product Name
- Description
- Price
- Stock quantity
- Category

**Optional Fields:**
- Image URL

**Technical Flow:**
```
POST /api/products?shop_id=shop-uuid-1
Headers:
  Authorization: Bearer <token>

Request Body:
{
  "name": "Fresh Tomatoes",
  "description": "Locally grown organic tomatoes",
  "price": 50.0,
  "stock": 100,
  "category": "Vegetables",
  "image_url": null
}

Response:
{
  "id": "product-uuid-1",
  "shop_id": "shop-uuid-1",
  "name": "Fresh Tomatoes",
  "description": "Locally grown organic tomatoes",
  "price": 50.0,
  "category": "Vegetables",
  "stock": 100,
  "is_available": true,
  "image_url": null,
  "created_at": "2025-01-07T09:15:00Z"
}
```

**Step 3: Product Added**
- Product appears in shop's product list
- Visible to customers immediately
- Can be edited later

### 4.4 Managing Products

**Product List View:**

```
┌─────────────────────────────────────────────────────┐
│  Fresh Groceries Store                              │
│  Products:                                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Fresh Tomatoes               ₹50           │   │
│  │ Stock: 100                   Vegetables    │   │
│  │ [Edit] [Delete]                            │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Fresh Milk                   ₹60           │   │
│  │ Stock: 50                    Dairy         │   │
│  │ [Edit] [Delete]                            │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Edit Product:**
- Shop owner can update any field
- Price changes apply to new orders
- Stock updates are immediate

**Technical Flow:**
```
PUT /api/products/product-uuid-1
Headers:
  Authorization: Bearer <token>

Request Body:
{
  "name": "Fresh Tomatoes",
  "description": "Locally grown organic tomatoes",
  "price": 55.0,  // Price updated
  "stock": 80,     // Stock updated
  "category": "Vegetables",
  "image_url": null
}

Response:
{
  "message": "Product updated successfully"
}
```

### 4.5 Viewing Orders

**Shop Owner Dashboard - Orders Section:**

```
┌─────────────────────────────────────────────────────┐
│  Orders                                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Order #1234                        [PENDING]       │
│  ₹240                                               │
│  Customer: John Customer                            │
│  Items: Fresh Tomatoes x2, Fresh Milk x1, Rice x1  │
│  Delivery to: 123 Main St, Rural Town              │
│  Placed: Jan 7, 2025, 10:30 AM                     │
│                                                     │
│  Assign Delivery Agent:                             │
│  [Select Agent ▼]                                   │
│  - Mike Delivery (⭐ 4.8)                          │
│  - Sarah Transport (⭐ 4.6)                        │
│                                                     │
│  ─────────────────────────────────────────────     │
│                                                     │
│  Order #1233                        [ASSIGNED]      │
│  ₹180                                               │
│  Assigned to: Mike Delivery                         │
│  Status: Agent assigned                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Order Information Displayed:**
- Order ID
- Total amount
- Customer name
- Items ordered
- Delivery address
- Order status
- Timestamp

**Technical Flow:**
```
GET /api/orders
Headers:
  Authorization: Bearer <token>

// Backend filters orders for shop owner's shops
Response:
[
  {
    "id": "order-uuid-1",
    "customer_id": "user-uuid-1",
    "shop_id": "shop-uuid-1",
    "items": [
      {
        "product_id": "product-uuid-1",
        "product_name": "Fresh Tomatoes",
        "quantity": 2,
        "price": 50.0
      }
    ],
    "total_amount": 240.0,
    "delivery_address": "123 Main St",
    "status": "pending",
    "delivery_agent_id": null,
    "created_at": "2025-01-07T10:30:00Z"
  }
]
```

### 4.6 Assigning Delivery Agent

**Step 1: Shop owner views pending order**

**Step 2: Clicks "Assign Delivery Agent" dropdown**

**Step 3: Sees list of available delivery agents:**
```
[Select Agent ▼]
├── Mike Delivery (⭐ 4.8, 45 deliveries)
├── Sarah Transport (⭐ 4.6, 32 deliveries)
├── Ali Express (⭐ 4.7, 28 deliveries)
└── Priya Quick (⭐ 4.5, 21 deliveries)
```

**Selection Criteria:**
- Agent name
- Rating
- Number of completed deliveries
- Availability (all listed agents are available)

**Step 4: Selects an agent**

**Technical Flow:**
```
PUT /api/orders/order-uuid-1/assign?agent_id=agent-uuid-1
Headers:
  Authorization: Bearer <token>

Request Body: (empty)

Response:
{
  "message": "Delivery agent assigned"
}

// Backend updates order:
{
  "delivery_agent_id": "agent-uuid-1",
  "status": "assigned",
  "updated_at": "2025-01-07T11:00:00Z"
}
```

**Step 5: Confirmation**
- Success message displayed
- Order status changes to "assigned"
- Delivery agent sees the order in their dashboard

**Business Logic:**
- Only shop owner of the specific shop can assign agents
- Only pending orders can be assigned
- Agent must have "delivery_agent" role
- Order status automatically changes to "assigned"

### 4.7 Monitoring Deliveries

**Shop owner can see:**

```
Order #1234                        [PICKED_UP]
Agent: Mike Delivery
Status: Agent picked up from shop
Last updated: 2 minutes ago

Order #1233                        [DELIVERED]
Agent: Sarah Transport
Status: Delivered successfully
Delivered: Jan 6, 2025, 5:00 PM
```

**Real-time updates:**
- When agent marks as "picked up"
- When agent marks as "delivered"
- Shop owner sees status changes immediately

---

## 5. Delivery Agent Journey & Features

### 5.1 Delivery Agent Registration

**Similar to customer/shop owner with role = "delivery_agent"**

**Additional considerations:**
- Should provide phone number for contact
- Location helps with agent selection
- Can start receiving assignments immediately after registration

### 5.2 Delivery Agent Dashboard

**Initial View:**

```
┌─────────────────────────────────────────────────────┐
│  Delivery Agent Dashboard                           │
│  Welcome, Mike!                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────┐  ┌─────┐  ┌─────┐                         │
│  │ 3   │  │ 15  │  │ 18  │                         │
│  │Active│  │Done │  │Total│                         │
│  └─────┘  └─────┘  └─────┘                         │
│                                                     │
│  Active Deliveries:                                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Statistics Shown:**
- Active Deliveries: Orders currently assigned
- Completed: Orders successfully delivered
- Total: All-time deliveries

### 5.3 Viewing Assigned Deliveries

**Active Deliveries Section:**

```
┌─────────────────────────────────────────────────────┐
│  Active Deliveries                                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Order #1234                        [ASSIGNED]      │
│  ₹240                                               │
│                                                     │
│  📍 Pickup: Fresh Groceries Store                   │
│      456 Market Street                              │
│                                                     │
│  📍 Deliver to: John Customer                       │
│      123 Main St, Rural Town                        │
│      Phone: +1234567890                             │
│                                                     │
│  📦 Items:                                          │
│  • Fresh Tomatoes x2                                │
│  • Fresh Milk x1                                    │
│  • Rice x1                                          │
│                                                     │
│  💰 Amount to Collect: ₹240 (Cash on Delivery)     │
│                                                     │
│  [Mark as Picked Up]                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Information Provided:**
- Order ID and amount
- Pickup location (shop address)
- Delivery location (customer address and phone)
- Items to deliver
- Amount to collect (cash)
- Status and action buttons

**Technical Flow:**
```
GET /api/orders
Headers:
  Authorization: Bearer <token>

// Backend filters for assigned orders
Response:
[
  {
    "id": "order-uuid-1",
    "customer_id": "user-uuid-1",
    "shop_id": "shop-uuid-1",
    "items": [...],
    "total_amount": 240.0,
    "delivery_address": "123 Main St, Rural Town",
    "delivery_location": {
      "lat": 12.34,
      "lng": 56.78
    },
    "status": "assigned",
    "delivery_agent_id": "agent-uuid-1",
    "created_at": "2025-01-07T10:30:00Z",
    "updated_at": "2025-01-07T11:00:00Z"
  }
]
```

### 5.4 Updating Delivery Status

**Status Flow for Agent:**

```
[ASSIGNED] → [PICKED_UP] → [DELIVERED]
    ↓            ↓              ↓
  [Mark as   [Mark as     (Complete)
  Picked Up]  Delivered]
```

**Step 1: Agent Goes to Shop**
- Views order details
- Goes to pickup location
- Collects items from shop

**Step 2: Agent Clicks "Mark as Picked Up"**

```
PUT /api/orders/order-uuid-1/status?status=picked_up
Headers:
  Authorization: Bearer <token>

Response:
{
  "message": "Order status updated"
}

// Order status changes to "picked_up"
```

**UI Update:**
```
Order #1234                        [PICKED_UP]
₹240

Items collected from shop
Next step: Deliver to customer

📍 Deliver to: John Customer
    123 Main St, Rural Town
    Phone: +1234567890

[Mark as Delivered]
```

**Step 3: Agent Delivers to Customer**
- Goes to delivery address
- Delivers items
- Collects cash payment (₹240)

**Step 4: Agent Clicks "Mark as Delivered"**

```
PUT /api/orders/order-uuid-1/status?status=delivered
Headers:
  Authorization: Bearer <token>

Response:
{
  "message": "Order status updated"
}

// Order status changes to "delivered"
```

**Step 5: Delivery Complete**
- Order moves to "Completed Deliveries"
- Success message shown
- Statistics updated

### 5.5 Completed Deliveries

**Completed Section:**

```
┌─────────────────────────────────────────────────────┐
│  Completed Deliveries                               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Order #1234                        [DELIVERED]     │
│  ₹240                                               │
│  Delivered to: 123 Main St                          │
│  Completed: Jan 7, 2025, 12:00 PM                   │
│                                                     │
│  Order #1233                        [DELIVERED]     │
│  ₹180                                               │
│  Delivered to: 789 Oak Avenue                       │
│  Completed: Jan 6, 2025, 5:00 PM                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Information Shown:**
- Order ID
- Amount collected
- Delivery address
- Completion timestamp

### 5.6 Agent Ratings

**Agents can view their ratings:**

```
┌─────────────────────────────────────────────────────┐
│  Your Performance                                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Overall Rating: ⭐⭐⭐⭐⭐ 4.8/5.0                  │
│  Total Deliveries: 45                               │
│  Total Reviews: 38                                  │
│                                                     │
│  Recent Reviews:                                    │
│  ─────────────────────────────────────────────     │
│  ⭐⭐⭐⭐⭐                                           │
│  "Very fast delivery! Friendly agent."              │
│  - Customer John, Jan 7, 2025                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Technical Flow:**
```
GET /api/reviews/agent-uuid-1

Response:
[
  {
    "id": "review-uuid-1",
    "reviewer_id": "user-uuid-1",
    "target_id": "agent-uuid-1",
    "target_type": "delivery_agent",
    "rating": 5,
    "comment": "Very fast delivery! Friendly agent.",
    "created_at": "2025-01-07T12:30:00Z"
  }
]
```

---

## 6. Core Features Detailed

### 6.1 Authentication System

**Technology:** JWT (JSON Web Tokens)

**How It Works:**

**1. Registration/Login**
```
User submits credentials
        ↓
Backend validates
        ↓
Password hashed (bcrypt)
        ↓
User record saved to MongoDB
        ↓
JWT token generated
        ↓
Token sent to frontend
        ↓
Stored in localStorage
```

**Token Structure:**
```javascript
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "user_id": "user-uuid-1",
    "role": "customer",
    "exp": 1704715200  // Expiration timestamp (7 days)
  },
  "signature": "..."
}
```

**Token Usage:**
```javascript
// Every API call includes token
fetch('/api/orders', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...'
  }
})

// Backend verifies token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.user_id;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
```

**Security Features:**
- Passwords never stored in plain text
- bcrypt hashing (salt rounds: 10)
- Token expiration (7 days)
- Token validation on every protected route
- Role-based access control

**Token Expiration:**
- After 7 days, token expires
- User must login again
- Can be extended (future enhancement)

### 6.2 Location Services

**Two Methods:**

**Method 1: Manual Entry**
```
User types address
        ↓
Address stored as string
        ↓
Can include approximate lat/lng (0, 0)
```

**Method 2: Auto-detect (Browser Geolocation)**
```
User clicks "Auto" button
        ↓
Browser requests permission
        ↓
User grants permission
        ↓
navigator.geolocation.getCurrentPosition()
        ↓
Receives coordinates
        ↓
{lat: 12.34, lng: 56.78}
        ↓
Stored with address
```

**Implementation:**
```javascript
function detectLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation not supported');
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        address: `${position.coords.latitude}, ${position.coords.longitude}`
      };
      onLocationSelect(location);
    },
    (error) => {
      console.error('Error:', error);
      alert('Failed to detect location');
    }
  );
}
```

**Limitations:**
- Only works on HTTPS or localhost
- Requires user permission
- May not be accurate in rural areas
- Fallback to manual entry always available

**Location Usage:**
- Customer delivery address
- Shop location (for customers to find)
- Agent location (for assignment)
- Distance calculation (future enhancement)

### 6.3 Shopping Cart

**Implementation:** Frontend State Management

**Cart Structure:**
```javascript
const [cart, setCart] = useState([
  {
    product_id: "product-uuid-1",
    product_name: "Fresh Tomatoes",
    quantity: 2,
    price: 50.0
  },
  {
    product_id: "product-uuid-2",
    product_name: "Fresh Milk",
    quantity: 1,
    price: 60.0
  }
]);
```

**Cart Operations:**

**Add to Cart:**
```javascript
function addToCart(product) {
  const existing = cart.find(item => item.product_id === product.id);
  
  if (existing) {
    // Increment quantity
    setCart(cart.map(item =>
      item.product_id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  } else {
    // Add new item
    setCart([...cart, {
      product_id: product.id,
      product_name: product.name,
      quantity: 1,
      price: product.price
    }]);
  }
}
```

**Remove from Cart:**
```javascript
function removeFromCart(productId) {
  setCart(cart.filter(item => item.product_id !== productId));
}
```

**Calculate Total:**
```javascript
const total = cart.reduce((sum, item) => 
  sum + (item.price * item.quantity), 0
);
```

**Cart Persistence:**
- Stored in component state (RAM)
- Lost on page refresh
- Intentional design (prevents stale cart)
- Future enhancement: Save to localStorage

**Why Not Save Cart?**
- Prices may change
- Products may go out of stock
- Fresh cart ensures accuracy
- Encourages timely ordering

### 6.4 Order Management

**Order Lifecycle:**

```
1. CREATION (Customer)
   - Customer adds items to cart
   - Reviews cart
   - Places order
   - Status: "pending"

2. ASSIGNMENT (Shop Owner)
   - Shop owner sees order
   - Selects delivery agent
   - Assigns order
   - Status: "assigned"

3. PICKUP (Delivery Agent)
   - Agent goes to shop
   - Collects items
   - Marks as picked up
   - Status: "picked_up"

4. DELIVERY (Delivery Agent)
   - Agent delivers to customer
   - Collects cash
   - Marks as delivered
   - Status: "delivered"

5. REVIEW (Customer - Optional)
   - Customer rates shop
   - Customer rates agent
```

**Order Status States:**

| Status | Who Updates | Next State | Description |
|--------|-------------|------------|-------------|
| pending | System | assigned | Order placed, awaiting assignment |
| assigned | Shop Owner | picked_up | Agent assigned to order |
| picked_up | Delivery Agent | delivered | Agent collected from shop |
| delivered | Delivery Agent | - | Order completed |

**Order Data Model:**
```javascript
{
  id: "uuid",
  customer_id: "uuid",
  shop_id: "uuid",
  items: [
    {
      product_id: "uuid",
      product_name: "string",
      quantity: number,
      price: number
    }
  ],
  total_amount: number,
  delivery_address: "string",
  delivery_location: {lat, lng},
  status: "pending|assigned|picked_up|delivered",
  delivery_agent_id: "uuid|null",
  created_at: "ISO timestamp",
  updated_at: "ISO timestamp"
}
```

**Business Rules:**
1. Customer can only see their own orders
2. Shop owner can only see orders for their shops
3. Delivery agent can only see assigned orders
4. Only pending orders can be assigned
5. Only assigned orders can be picked up
6. Only picked up orders can be delivered
7. Status can't go backwards
8. Total amount is calculated at order creation

### 6.5 Real-time Order Tracking

**How It Works:**

**Frontend Polling (Current Implementation):**
```javascript
useEffect(() => {
  // Fetch orders every 5 seconds
  const interval = setInterval(() => {
    fetchOrders();
  }, 5000);
  
  return () => clearInterval(interval);
}, []);
```

**Status Display:**
```javascript
function OrderStatus({ status }) {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    assigned: 'bg-blue-100 text-blue-800',
    picked_up: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800'
  };
  
  return (
    <span className={colors[status]}>
      {status.toUpperCase()}
    </span>
  );
}
```

**Timeline View (Future Enhancement):**
```
Order Timeline:

⏳ Placed          ✓ Jan 7, 10:30 AM
📋 Assigned        ✓ Jan 7, 11:00 AM
📦 Picked Up       ✓ Jan 7, 11:30 AM
✅ Delivered       ⏳ In Progress...
```

**Future Enhancements:**
- WebSocket for real-time updates
- Push notifications
- SMS notifications
- Email notifications
- Live agent location tracking

### 6.6 Rating & Review System

**Backend Implementation:**

**Review Model:**
```javascript
{
  id: "uuid",
  reviewer_id: "uuid",        // Customer who reviews
  target_id: "uuid",          // Shop or Agent ID
  target_type: "shop|delivery_agent",
  rating: number (1-5),
  comment: "string",
  created_at: "timestamp"
}
```

**Creating Review:**
```javascript
POST /api/reviews
{
  "target_id": "shop-uuid-1",
  "target_type": "shop",
  "rating": 5,
  "comment": "Excellent service!"
}

// Backend automatically:
// 1. Saves review
// 2. Calculates average rating
// 3. Updates shop/agent rating
```

**Rating Calculation:**
```javascript
async function updateRating(targetId, targetType) {
  // Get all reviews for target
  const reviews = await db.reviews.find({ 
    target_id: targetId 
  });
  
  // Calculate average
  const avgRating = reviews.reduce((sum, r) => 
    sum + r.rating, 0
  ) / reviews.length;
  
  // Update shop or agent
  const collection = targetType === 'shop' 
    ? db.shops 
    : db.users;
    
  await collection.updateOne(
    { id: targetId },
    { 
      $set: { 
        rating: avgRating,
        total_reviews: reviews.length 
      }
    }
  );
}
```

**Rating Display:**
```javascript
// Star rating component
function StarRating({ rating, totalReviews }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={star <= rating ? 'filled' : 'empty'}
        />
      ))}
      {totalReviews > 0 && (
        <span>({totalReviews} reviews)</span>
      )}
    </div>
  );
}
```

**Business Rules:**
1. Only customers can leave reviews
2. Can review shops and delivery agents
3. One review per order (future enhancement)
4. Rating must be 1-5 stars
5. Comment is required
6. Reviews are permanent (can't delete)
7. Average rating updates immediately

---

## 7. Technical Workflow

### 7.1 Request-Response Flow

**Example: Customer Places Order**

```
┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐
│ Browser │      │  React  │      │ FastAPI │      │ MongoDB │
└────┬────┘      └────┬────┘      └────┬────┘      └────┬────┘
     │                │                │                │
     │ Click "Place   │                │                │
     │ Order"        │                │                │
     ├───────────────>│                │                │
     │                │                │                │
     │                │ POST /api/     │                │
     │                │ orders         │                │
     │                ├───────────────>│                │
     │                │ + JWT token    │                │
     │                │                │                │
     │                │                │ Verify Token   │
     │                │                │────────────┐   │
     │                │                │            │   │
     │                │                │<───────────┘   │
     │                │                │                │
     │                │                │ Insert Order   │
     │                │                ├───────────────>│
     │                │                │                │
     │                │                │<───────────────┤
     │                │                │ Order Saved    │
     │                │                │                │
     │                │<───────────────┤                │
     │                │ 200 OK         │                │
     │                │ {order data}   │                │
     │                │                │                │
     │<───────────────┤                │                │
     │ "Order placed  │                │                │
     │ successfully!" │                │                │
     │                │                │                │
```

### 7.2 Authentication Flow

**Login Flow:**

```
┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐
│ Browser │      │  React  │      │ FastAPI │      │ MongoDB │
└────┬────┘      └────┬────┘      └────┬────┘      └────┬────┘
     │                │                │                │
     │ Enter email    │                │                │
     │ & password     │                │                │
     ├───────────────>│                │                │
     │                │                │                │
     │                │ POST /api/auth/│                │
     │                │ login          │                │
     │                ├───────────────>│                │
     │                │                │                │
     │                │                │ Find user by   │
     │                │                │ email          │
     │                │                ├───────────────>│
     │                │                │                │
     │                │                │<───────────────┤
     │                │                │ User record    │
     │                │                │                │
     │                │                │ Verify password│
     │                │                │────────────┐   │
     │                │                │            │   │
     │                │                │<───────────┘   │
     │                │                │                │
     │                │                │ Generate JWT   │
     │                │                │────────────┐   │
     │                │                │            │   │
     │                │                │<───────────┘   │
     │                │                │                │
     │                │<───────────────┤                │
     │                │ 200 OK         │                │
     │                │ {user, token}  │                │
     │                │                │                │
     │                │ Store token in │                │
     │                │ localStorage   │                │
     │                │────────────┐   │                │
     │                │            │   │                │
     │                │<───────────┘   │                │
     │                │                │                │
     │<───────────────┤                │                │
     │ Redirect to    │                │                │
     │ Dashboard      │                │                │
     │                │                │                │
```

### 7.3 Order Assignment Flow

**Shop Owner Assigns Delivery Agent:**

```
┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐
│ShopOwner│      │  React  │      │ FastAPI │      │ MongoDB │
└────┬────┘      └────┬────┘      └────┬────┘      └────┬────┘
     │                │                │                │
     │ View orders    │                │                │
     ├───────────────>│                │                │
     │                │                │                │
     │                │ GET /api/orders│                │
     │                ├───────────────>│                │
     │                │ + JWT token    │                │
     │                │                │                │
     │                │                │ Verify token   │
     │                │                │ Get user role  │
     │                │                │                │
     │                │                │ Filter orders  │
     │                │                │ for shop owner │
     │                │                ├───────────────>│
     │                │                │                │
     │                │                │<───────────────┤
     │                │                │ Orders list    │
     │                │                │                │
     │                │<───────────────┤                │
     │                │ Orders data    │                │
     │                │                │                │
     │<───────────────┤                │                │
     │ Display orders │                │                │
     │                │                │                │
     │ Select agent   │                │                │
     │ from dropdown  │                │                │
     ├───────────────>│                │                │
     │                │                │                │
     │                │ PUT /api/orders│                │
     │                │ /{id}/assign   │                │
     │                ├───────────────>│                │
     │                │ + agent_id     │                │
     │                │                │                │
     │                │                │ Verify shop    │
     │                │                │ owner owns shop│
     │                │                ├───────────────>│
     │                │                │                │
     │                │                │ Verify agent   │
     │                │                │ exists         │
     │                │                ├───────────────>│
     │                │                │                │
     │                │                │ Update order   │
     │                │                │ - agent_id     │
     │                │                │ - status       │
     │                │                ├───────────────>│
     │                │                │                │
     │                │                │<───────────────┤
     │                │                │ Updated        │
     │                │                │                │
     │                │<───────────────┤                │
     │                │ Success        │                │
     │                │                │                │
     │<───────────────┤                │                │
     │ "Agent assigned"│                │                │
     │                │                │                │
```

---

## 8. Database & Data Flow

### 8.1 Database Collections

**MongoDB Collections:**

1. **users** - All user accounts
2. **shops** - Shop information
3. **products** - Product catalog
4. **orders** - Order records
5. **reviews** - Ratings and reviews

### 8.2 Collection Schemas

**users Collection:**
```javascript
{
  _id: ObjectId,  // MongoDB internal ID (excluded in responses)
  id: "uuid",     // Our application ID
  email: "string (unique)",
  password: "string (hashed)",
  phone: "string",
  name: "string",
  role: "customer|shop_owner|delivery_agent",
  location: {
    address: "string",
    lat: number,
    lng: number
  },
  rating: number (0-5),
  total_reviews: number,
  created_at: "ISO timestamp"
}

// Indexes:
// - email (unique)
// - id (unique)
// - role
```

**shops Collection:**
```javascript
{
  _id: ObjectId,
  id: "uuid",
  owner_id: "uuid (references users.id)",
  name: "string",
  description: "string",
  location: {
    address: "string",
    lat: number,
    lng: number
  },
  address: "string",
  phone: "string",
  rating: number (0-5),
  total_reviews: number,
  is_active: boolean,
  created_at: "ISO timestamp"
}

// Indexes:
// - id (unique)
// - owner_id
// - is_active
```

**products Collection:**
```javascript
{
  _id: ObjectId,
  id: "uuid",
  shop_id: "uuid (references shops.id)",
  name: "string",
  description: "string",
  price: number,
  category: "string",
  image_url: "string|null",
  stock: number,
  is_available: boolean,
  created_at: "ISO timestamp"
}

// Indexes:
// - id (unique)
// - shop_id
// - is_available
```

**orders Collection:**
```javascript
{
  _id: ObjectId,
  id: "uuid",
  customer_id: "uuid (references users.id)",
  shop_id: "uuid (references shops.id)",
  items: [
    {
      product_id: "uuid",
      product_name: "string",
      quantity: number,
      price: number
    }
  ],
  total_amount: number,
  delivery_address: "string",
  delivery_location: {
    lat: number,
    lng: number
  },
  status: "pending|assigned|picked_up|delivered",
  delivery_agent_id: "uuid|null (references users.id)",
  created_at: "ISO timestamp",
  updated_at: "ISO timestamp"
}

// Indexes:
// - id (unique)
// - customer_id
// - shop_id
// - delivery_agent_id
// - status
// - created_at (descending)
```

**reviews Collection:**
```javascript
{
  _id: ObjectId,
  id: "uuid",
  reviewer_id: "uuid (references users.id)",
  target_id: "uuid (shop or user id)",
  target_type: "shop|delivery_agent",
  rating: number (1-5),
  comment: "string",
  created_at: "ISO timestamp"
}

// Indexes:
// - id (unique)
// - target_id + target_type (compound)
// - reviewer_id
```

### 8.3 Data Relationships

```
users (customers) ─┬─> orders (places)
                   │
                   └─> reviews (writes)

users (shop_owners) ─> shops (owns) ─> products (contains)
                                    │
                                    └─> orders (receives)

users (delivery_agents) ─> orders (assigned to)
                         │
                         └─> reviews (receives)

shops ─> reviews (receives)

orders ─> products (references in items array)
```

### 8.4 Data Flow Example: Complete Order

**Scenario: Customer orders items**

```
Step 1: Customer places order
─────────────────────────────────
POST /api/orders
{
  "shop_id": "shop-1",
  "items": [
    {"product_id": "prod-1", "product_name": "Tomatoes", "quantity": 2, "price": 50}
  ],
  "delivery_address": "123 Main St",
  "delivery_location": {"lat": 12.34, "lng": 56.78}
}

Database Action:
INSERT INTO orders
{
  "id": "order-1",
  "customer_id": "user-1",
  "shop_id": "shop-1",
  "items": [...],
  "total_amount": 100,
  "status": "pending",
  "delivery_agent_id": null,
  "created_at": "2025-01-07T10:30:00Z",
  "updated_at": "2025-01-07T10:30:00Z"
}

Step 2: Shop owner assigns agent
─────────────────────────────────
PUT /api/orders/order-1/assign?agent_id=agent-1

Database Action:
UPDATE orders
SET 
  delivery_agent_id = "agent-1",
  status = "assigned",
  updated_at = "2025-01-07T11:00:00Z"
WHERE id = "order-1"

Step 3: Agent picks up
──────────────────────
PUT /api/orders/order-1/status?status=picked_up

Database Action:
UPDATE orders
SET 
  status = "picked_up",
  updated_at = "2025-01-07T11:30:00Z"
WHERE id = "order-1"

Step 4: Agent delivers
──────────────────────
PUT /api/orders/order-1/status?status=delivered

Database Action:
UPDATE orders
SET 
  status = "delivered",
  updated_at = "2025-01-07T12:00:00Z"
WHERE id = "order-1"

Step 5: Customer reviews (optional)
───────────────────────────────────
POST /api/reviews
{
  "target_id": "shop-1",
  "target_type": "shop",
  "rating": 5,
  "comment": "Great service!"
}

Database Actions:
1. INSERT INTO reviews
   {
     "id": "review-1",
     "reviewer_id": "user-1",
     "target_id": "shop-1",
     "target_type": "shop",
     "rating": 5,
     "comment": "Great service!",
     "created_at": "2025-01-07T12:30:00Z"
   }

2. Calculate average rating:
   SELECT AVG(rating) FROM reviews WHERE target_id = "shop-1"
   Result: 4.7

3. UPDATE shops
   SET 
     rating = 4.7,
     total_reviews = 25
   WHERE id = "shop-1"
```

---

## 9. Security & Authentication

### 9.1 Password Security

**Hashing Process:**

```javascript
// Registration
const password = "userPassword123";

// Hash with bcrypt (salt rounds = 10)
const hashed = bcrypt.hashSync(password, 10);
// Result: $2b$10$N9qo8uLOickgx2ZMRZoMye...

// Store hashed password in database
await db.users.insertOne({
  ...userData,
  password: hashed  // Never store plain text
});

// Login
const inputPassword = "userPassword123";
const storedHash = "$2b$10$N9qo8uLOickgx2ZMRZoMye...";

// Verify
const isValid = bcrypt.compareSync(inputPassword, storedHash);
// true if matches, false otherwise
```

**Security Features:**
- Password never stored in plain text
- Salt is random for each password
- Same password = different hash for different users
- Computationally expensive (prevents brute force)
- Industry standard (bcrypt)

### 9.2 JWT Token Security

**Token Generation:**

```javascript
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

function createToken(userId, role) {
  const payload = {
    user_id: userId,
    role: role,
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60)  // 7 days
  };
  
  return jwt.sign(payload, SECRET_KEY, {
    algorithm: 'HS256'
  });
}
```

**Token Verification:**

```javascript
async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Check expiration
    if (decoded.exp < Date.now() / 1000) {
      throw new Error('Token expired');
    }
    
    // Get user from database
    const user = await db.users.findOne({ id: decoded.user_id });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
```

**Token Storage:**

```javascript
// Frontend (localStorage)
localStorage.setItem('token', token);

// Sent with every request
axios.get('/api/orders', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Backend extracts token
const authHeader = request.headers.authorization;
const token = authHeader.split(' ')[1];  // Get token after "Bearer "
```

**Security Best Practices:**
- Token stored in localStorage (XSS consideration)
- HTTPS in production (prevents token interception)
- Token expiration enforced
- Secret key stored in environment variable
- Token verified on every protected route

### 9.3 Role-Based Access Control

**Implementation:**

```javascript
// Middleware to check user role
function requireRole(allowedRoles) {
  return async (request, response, next) => {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return response.status(401).json({
        detail: 'Authentication required'
      });
    }
    
    if (!allowedRoles.includes(user.role)) {
      return response.status(403).json({
        detail: 'Insufficient permissions'
      });
    }
    
    next();
  };
}

// Usage in routes
app.post('/api/shops', 
  requireRole(['shop_owner']),
  createShop
);

app.put('/api/orders/:id/status',
  requireRole(['delivery_agent']),
  updateOrderStatus
);
```

**Access Control Matrix:**

| Endpoint | Customer | Shop Owner | Delivery Agent |
|----------|----------|------------|----------------|
| POST /api/orders | ✅ | ❌ | ❌ |
| POST /api/shops | ❌ | ✅ | ❌ |
| POST /api/products | ❌ | ✅ | ❌ |
| PUT /api/orders/assign | ❌ | ✅ | ❌ |
| PUT /api/orders/status | ❌ | ❌ | ✅ |
| POST /api/reviews | ✅ | ❌ | ❌ |
| GET /api/orders | ✅* | ✅* | ✅* |

*Filtered by role:
- Customer: Only their orders
- Shop Owner: Only their shop's orders
- Delivery Agent: Only assigned orders

### 9.4 Input Validation

**Pydantic Models for Validation:**

```python
from pydantic import BaseModel, EmailStr, Field

class UserRegister(BaseModel):
    email: EmailStr  # Validates email format
    password: str = Field(min_length=6)  # Minimum 6 chars
    phone: str = Field(regex=r'^\+?[1-9]\d{1,14}$')  # Valid phone
    name: str = Field(min_length=1, max_length=100)
    role: Literal['customer', 'shop_owner', 'delivery_agent']
    location: Optional[dict] = None

# FastAPI automatically validates
@app.post("/api/auth/register")
async def register(data: UserRegister):
    # If validation fails, 422 error returned automatically
    # If passes, data is guaranteed to be valid
    ...
```

**Validation Benefits:**
- Invalid data rejected before processing
- Type safety
- Automatic error messages
- SQL injection prevention
- XSS prevention (through proper escaping)

---

## 10. Business Logic & Rules

### 10.1 Order Status Rules

**Valid Transitions:**

```
pending → assigned    ✅ (shop owner assigns agent)
assigned → picked_up  ✅ (agent picks up)
picked_up → delivered ✅ (agent delivers)

pending → picked_up   ❌ (must be assigned first)
assigned → delivered  ❌ (must pick up first)
delivered → any       ❌ (final state)
```

**Enforcement:**

```javascript
async function updateOrderStatus(orderId, newStatus) {
  const order = await db.orders.findOne({ id: orderId });
  
  const validTransitions = {
    'pending': ['assigned'],
    'assigned': ['picked_up'],
    'picked_up': ['delivered'],
    'delivered': []
  };
  
  if (!validTransitions[order.status].includes(newStatus)) {
    throw new Error(`Cannot transition from ${order.status} to ${newStatus}`);
  }
  
  // Update allowed
  await db.orders.updateOne(
    { id: orderId },
    { $set: { status: newStatus, updated_at: new Date().toISOString() }}
  );
}
```

### 10.2 Inventory Management

**Stock Checking (Future Enhancement):**

```javascript
async function placeOrder(customerId, items, shopId) {
  // Check stock for all items
  for (const item of items) {
    const product = await db.products.findOne({ id: item.product_id });
    
    if (!product.is_available) {
      throw new Error(`Product ${product.name} is not available`);
    }
    
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }
  }
  
  // Create order
  const order = await createOrder(...);
  
  // Reduce stock (future enhancement)
  for (const item of items) {
    await db.products.updateOne(
      { id: item.product_id },
      { $inc: { stock: -item.quantity }}
    );
  }
  
  return order;
}
```

**Current Implementation:**
- Stock is displayed but not enforced
- Shop owner manages stock manually
- Future: Automatic stock reduction on order

### 10.3 Payment Rules

**Current: Cash on Delivery Only**

```
1. Customer places order (no payment online)
2. Delivery agent delivers items
3. Agent collects cash from customer
4. Agent keeps cash or returns to shop owner (business arrangement)
```

**Payment Flow:**

```
Customer                 Agent                   Shop Owner
   |                       |                         |
   | Order placed          |                         |
   | (₹240 total)          |                         |
   |                       |                         |
   |                       | Order assigned          |
   |                       |<------------------------|
   |                       |                         |
   |                       | Pick up items          |
   |                       |<------------------------|
   |                       |                         |
   | Items delivered       |                         |
   |<----------------------|                         |
   |                       |                         |
   | Pay ₹240 cash        |                         |
   |--------------------->|                         |
   |                       |                         |
   |                       | Settle with shop owner |
   |                       |------------------------>|
   |                       |                         |
```

**Future Enhancements:**
- Online payment integration
- Digital wallet
- Payment tracking
- Commission system
- Automated settlements

### 10.4 Rating Calculation

**Algorithm:**

```javascript
async function calculateAndUpdateRating(targetId, targetType) {
  // Get all reviews for this target
  const reviews = await db.reviews.find({
    target_id: targetId,
    target_type: targetType
  }).toArray();
  
  // Calculate average
  const totalRating = reviews.reduce((sum, review) => 
    sum + review.rating, 0
  );
  const avgRating = reviews.length > 0 
    ? totalRating / reviews.length 
    : 0;
  
  // Round to 1 decimal place
  const roundedRating = Math.round(avgRating * 10) / 10;
  
  // Update target (shop or user)
  const collection = targetType === 'shop' 
    ? db.shops 
    : db.users;
  
  await collection.updateOne(
    { id: targetId },
    { 
      $set: { 
        rating: roundedRating,
        total_reviews: reviews.length 
      }
    }
  );
  
  return roundedRating;
}
```

**Example:**
```
Reviews: [5, 4, 5, 5, 4, 5, 3, 5, 4, 5]
Sum: 45
Count: 10
Average: 45 / 10 = 4.5
Displayed: ⭐⭐⭐⭐★ 4.5/5.0 (10 reviews)
```

**Rating Impact:**
- Influences customer decisions
- Higher ratings = more visibility (future)
- Builds trust in platform
- Incentivizes good service

### 10.5 Business Rules Summary

**Orders:**
1. Customers can only order from active shops
2. Order total is sum of (price × quantity) for all items
3. Delivery location must be provided
4. Cash on delivery is the only payment method
5. Orders cannot be cancelled (future enhancement)
6. Orders cannot be edited after placement

**Shops:**
1. Only shop owners can create shops
2. Shop name must be unique per owner (future enhancement)
3. Shops can be deactivated but not deleted
4. Only shop owner can manage their shops

**Products:**
1. Only shop owners can add products
2. Products belong to exactly one shop
3. Price must be positive
4. Stock can be 0 (out of stock)
5. Products can be made unavailable

**Delivery:**
1. Only delivery agents with role can be assigned
2. Agent must exist in system
3. Only shop owner of the shop can assign
4. One agent per order
5. Agent cannot unassign themselves

**Reviews:**
1. Only customers can write reviews
2. Rating must be 1-5 stars
3. Comment is required
4. Reviews are immutable
5. One review per order per target (future enhancement)

---

## Conclusion

This documentation provides a comprehensive overview of the SamaanDena platform, including:

✅ Complete user journeys for all three roles  
✅ Detailed feature explanations  
✅ Technical workflows and architecture  
✅ Database schema and relationships  
✅ Security implementation  
✅ Business logic and rules  

The platform is designed to be:
- **Simple** - Easy to understand and use
- **Secure** - Proper authentication and authorization
- **Scalable** - Can grow with more users and features
- **Community-focused** - Built for rural commerce ecosystem

For technical implementation details, refer to:
- `LOCAL_DEVELOPMENT_GUIDE.md` - Setup instructions
- `COMMANDS_REFERENCE.md` - Quick commands
- `README.md` - Project overview
- API documentation at http://localhost:8001/docs

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Next Review:** When major features are added

---

*Built with ❤️ for rural communities*
