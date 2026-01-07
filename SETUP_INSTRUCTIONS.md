# SamaanDena - Local Goods Delivery Platform

A complete multi-role delivery platform connecting local shops, customers, and delivery agents in rural areas.

## Features

- **Multi-Role System**: Customer, Shop Owner, and Delivery Agent roles
- **Location-Based Discovery**: Find shops near you (manual + auto-detect)
- **Real-Time Order Tracking**: Track orders from placement to delivery
- **Shop Management**: Shop owners can manage products and orders
- **Delivery Management**: Delivery agents can update delivery status
- **Rating & Review System**: Community-driven trust building
- **Mobile-First Design**: Responsive, modern UI optimized for all devices

## Tech Stack

- **Frontend**: React 19, Tailwind CSS, Shadcn/UI Components
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Authentication**: JWT-based with bcrypt password hashing

## Prerequisites

Before running the application, ensure you have the following installed:

- **Python 3.11+**
- **Node.js 18+** and **Yarn**
- **MongoDB** (local installation or MongoDB Atlas)

## Local Setup Instructions

### 1. Clone/Extract the Application

```bash
# Extract the zip file
unzip samaandena-app.zip
cd samaandena-app
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB (if not already installed)
# For Ubuntu/Debian:
sudo apt-get install mongodb

# Start MongoDB service
sudo service mongodb start

# MongoDB will run on mongodb://localhost:27017
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at https://www.mongodb.com/atlas
2. Create a cluster and get connection string
3. Update `backend/.env` with your MongoDB Atlas URL

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit backend/.env file if needed:
# - MONGO_URL: Your MongoDB connection string
# - JWT_SECRET: Change to a secure random string for production
# - DB_NAME: Database name (default: test_database)

# Run the backend server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

The backend API will be available at: `http://localhost:8001`
API documentation: `http://localhost:8001/docs`

### 4. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
yarn install

# Configure environment variables
# Edit frontend/.env file:
# - REACT_APP_BACKEND_URL: Set to http://localhost:8001 for local development

# Start the frontend development server
yarn start
```

The frontend will be available at: `http://localhost:3000`

### 5. Access the Application

1. Open your browser and navigate to `http://localhost:3000`
2. You'll see the landing page
3. Click "Get Started" to register
4. Choose your role:
   - **Customer**: Browse shops and place orders
   - **Shop Owner**: Create shops and manage products
   - **Delivery Agent**: Manage deliveries

## User Flows

### As a Customer:
1. Register with email, password, phone, and location
2. Browse local shops
3. Click on a shop to view products
4. Add products to cart
5. Place order with Cash on Delivery
6. Track order status in "My Orders"

### As a Shop Owner:
1. Register as shop owner
2. Create your shop with name, description, location
3. Add products with name, price, description, stock
4. View incoming orders
5. Assign delivery agents to orders
6. Monitor order status

### As a Delivery Agent:
1. Register as delivery agent
2. View assigned deliveries
3. Update delivery status:
   - Mark as "Picked Up" when collected from shop
   - Mark as "Delivered" when delivered to customer

## Project Structure

```
samaandena-app/
├── backend/
│   ├── server.py              # Main FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── contexts/          # React contexts (Auth)
│   │   ├── pages/             # Page components
│   │   ├── App.js             # Main app component
│   │   └── index.css          # Global styles
│   ├── package.json           # Node dependencies
│   └── .env                   # Frontend environment variables
└── README.md                  # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Shops
- `GET /api/shops` - Get all shops
- `POST /api/shops` - Create shop (shop owner only)
- `GET /api/shops/{id}` - Get shop details
- `GET /api/shops/owner/my-shops` - Get my shops

### Products
- `GET /api/products` - Get products (with optional shop_id filter)
- `POST /api/products` - Create product (shop owner only)
- `PUT /api/products/{id}` - Update product

### Orders
- `GET /api/orders` - Get orders (filtered by user role)
- `POST /api/orders` - Create order (customer only)
- `GET /api/orders/{id}` - Get order details
- `PUT /api/orders/{id}/status` - Update order status
- `PUT /api/orders/{id}/assign` - Assign delivery agent

### Delivery Agents
- `GET /api/delivery-agents` - Get all delivery agents

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/{target_id}` - Get reviews for shop/agent

## Environment Variables

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
JWT_SECRET=your-secret-key-change-in-production
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

## Default Test Credentials

You can create test accounts for each role through the registration page.

Example test accounts you can create:
- Customer: customer@test.com / password123
- Shop Owner: shop@test.com / password123
- Delivery Agent: agent@test.com / password123

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `sudo service mongodb status`
- Check connection string in `backend/.env`
- For Atlas, ensure IP whitelist includes your IP

### Port Already in Use
```bash
# Backend (port 8001)
lsof -ti:8001 | xargs kill -9

# Frontend (port 3000)
lsof -ti:3000 | xargs kill -9
```

### Module Not Found Errors
```bash
# Backend
cd backend && pip install -r requirements.txt

# Frontend
cd frontend && yarn install
```

### CORS Issues
- Ensure `CORS_ORIGINS` in backend/.env includes your frontend URL
- For development, `*` allows all origins

## Production Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is set correctly
3. Change JWT_SECRET to a secure random string
4. Set CORS_ORIGINS to your frontend domain

### Frontend Deployment (Vercel/Netlify)
1. Update REACT_APP_BACKEND_URL to your backend production URL
2. Build the app: `yarn build`
3. Deploy the `build` folder

## Security Notes

⚠️ **Important for Production:**
- Change JWT_SECRET to a strong random string
- Use environment-specific MongoDB credentials
- Enable MongoDB authentication
- Set specific CORS_ORIGINS (not *)
- Use HTTPS for all connections
- Implement rate limiting on API endpoints
- Add input validation and sanitization
- Use secure password requirements

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API documentation at `http://localhost:8001/docs`
3. Check browser console and backend logs for errors

## License

This project is built for educational and commercial use.

---

**Built with ❤️ for rural communities**
