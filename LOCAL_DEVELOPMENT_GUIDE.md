# 🚀 SamaanDena - Complete Local Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Setup](#mongodb-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Testing End-to-End](#testing-end-to-end)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have the following installed:

### 1. Python 3.11+
```bash
# Check Python version
python3 --version

# If not installed:
# Ubuntu/Debian:
sudo apt update
sudo apt install python3 python3-pip python3-venv

# macOS (using Homebrew):
brew install python@3.11

# Windows: Download from https://www.python.org/downloads/
```

### 2. Node.js 18+ and Yarn
```bash
# Check Node.js version
node --version

# Check Yarn version
yarn --version

# If not installed:
# Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g yarn

# macOS:
brew install node
npm install -g yarn

# Windows: Download from https://nodejs.org/
```

### 3. Git (to clone the repository)
```bash
# Check Git version
git --version

# If not installed:
# Ubuntu/Debian:
sudo apt install git

# macOS:
brew install git

# Windows: Download from https://git-scm.com/
```

---

## MongoDB Setup

You have two options: **Local MongoDB** or **MongoDB Atlas (Cloud)**

### Option A: Local MongoDB (Recommended for Development)

#### Ubuntu/Debian:
```bash
# Import the public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo \"deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/7.0 multiverse\" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

#### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0

# Verify MongoDB is running
brew services list
```

#### Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will start automatically as a Windows service

**Test MongoDB Connection:**
```bash
# Open MongoDB shell
mongosh

# You should see MongoDB connection info
# Type 'exit' to quit
```

### Option B: MongoDB Atlas (Cloud - Free Tier)

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create Cluster:**
   - Click \"Build a Database\"
   - Select \"M0 FREE\" tier
   - Choose a cloud provider and region
   - Click \"Create\"

3. **Create Database User:**
   - Go to \"Database Access\" in left menu
   - Click \"Add New Database User\"
   - Set username and password (remember these!)
   - Give \"Read and write to any database\" permissions

4. **Whitelist IP Address:**
   - Go to \"Network Access\" in left menu
   - Click \"Add IP Address\"
   - Click \"Allow Access from Anywhere\" (for development)
   - Or add your specific IP address

5. **Get Connection String:**
   - Go to \"Database\" in left menu
   - Click \"Connect\" on your cluster
   - Choose \"Connect your application\"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`

---

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Create Virtual Environment
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\\Scripts\\activate

# You should see (venv) in your terminal prompt
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables
```bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your favorite editor
nano .env
# or
vim .env
# or
code .env  # if using VS Code
```

**Configure `.env` file:**
```env
# For Local MongoDB:
MONGO_URL=mongodb://localhost:27017
DB_NAME=samaandena_db
CORS_ORIGINS=http://localhost:3000
JWT_SECRET=your-super-secret-key-change-this-in-production-use-random-string

# For MongoDB Atlas (Cloud):
# MONGO_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
# DB_NAME=samaandena_db
# CORS_ORIGINS=http://localhost:3000
# JWT_SECRET=your-super-secret-key-change-this-in-production
```

**Generate a secure JWT_SECRET:**
```bash
# Option 1: Using Python
python3 -c "import secrets; print(secrets.token_urlsafe(32))"

# Option 2: Using OpenSSL
openssl rand -base64 32
```

### Step 5: Verify Backend Setup
```bash
# Test if all dependencies are installed
python3 -c "import fastapi, motor, jwt, bcrypt; print('All dependencies installed!')"
```

---

## Frontend Setup

### Step 1: Open New Terminal
Keep the backend terminal open. Open a **new terminal window** for frontend.

### Step 2: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 3: Install Dependencies
```bash
yarn install
```

This will take 2-5 minutes depending on your internet speed.

### Step 4: Configure Environment Variables
```bash
# Copy example environment file
cp .env.example .env

# Edit .env file
nano .env
```

**Configure `.env` file:**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Important:** Make sure the backend URL matches where your backend will run!

---

## Running the Application

### Terminal 1: Start Backend

```bash
# Navigate to backend directory
cd backend

# Activate virtual environment if not already active
source venv/bin/activate  # Linux/macOS
# or
venv\\Scripts\\activate  # Windows

# Start the backend server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8001 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

✅ **Backend is running at:** http://localhost:8001  
📚 **API Documentation:** http://localhost:8001/docs

### Terminal 2: Start Frontend

```bash
# Navigate to frontend directory
cd frontend

# Start the frontend development server
yarn start
```

**Expected Output:**
```
Compiled successfully!

You can now view samaandena-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

✅ **Frontend is running at:** http://localhost:3000

The browser should automatically open. If not, manually open http://localhost:3000

---

## Testing End-to-End

Now let's test the complete application flow with all three user roles.

### Test Scenario: Complete Order Flow

#### Step 1: Create Shop Owner Account
1. Open http://localhost:3000
2. Click **\"Get Started\"** or **\"Login\"** button
3. Click **\"Register\"** tab
4. Fill in the form:
   - **Full Name:** John Shop Owner
   - **Email:** shopowner@test.com
   - **Phone:** +1234567890
   - **Password:** Test123!
   - **Role:** Select **\"Shop Owner\"**
   - **Location:** Enter an address or click \"Auto\" button
5. Click **\"Create Account\"**

You should be redirected to the Shop Owner Dashboard.

#### Step 2: Create a Shop
1. In Shop Owner Dashboard, click **\"Create Shop\"** or **\"Add Shop\"**
2. Fill in shop details:
   - **Shop Name:** Fresh Groceries Store
   - **Description:** We sell fresh vegetables, fruits, and daily essentials
   - **Phone:** +1234567890
   - **Address:** 123 Main Street, Rural Town
   - **Location:** Set the location (manual or auto)
3. Click **\"Create Shop\"**

✅ Shop created successfully!

#### Step 3: Add Products
1. Click **\"Add Product\"** button
2. Add Product 1:
   - **Name:** Fresh Tomatoes
   - **Description:** Locally grown fresh tomatoes
   - **Price:** 50
   - **Stock:** 100
   - **Category:** Vegetables
3. Click **\"Add Product\"**
4. Repeat to add more products:
   - Product 2: Fresh Milk (₹60, Dairy)
   - Product 3: Rice (₹80, Groceries)

✅ Products added successfully!

#### Step 4: Create Delivery Agent Account
1. **Logout** from shop owner account (click Logout button in navbar)
2. Click **\"Login\"** button
3. Click **\"Register\"** tab
4. Fill in the form:
   - **Full Name:** Mike Delivery Agent
   - **Email:** agent@test.com
   - **Phone:** +9876543210
   - **Password:** Test123!
   - **Role:** Select **\"Delivery Agent\"**
   - **Location:** Enter an address
5. Click **\"Create Account\"**

You should be redirected to the Delivery Agent Dashboard (empty for now).

#### Step 5: Create Customer Account and Place Order
1. **Logout** from delivery agent account
2. Click **\"Login\"** button
3. Click **\"Register\"** tab
4. Fill in the form:
   - **Full Name:** Sarah Customer
   - **Email:** customer@test.com
   - **Phone:** +5555555555
   - **Password:** Test123!
   - **Role:** Select **\"Customer\"**
   - **Location:** Enter delivery address
5. Click **\"Create Account\"**

You should be redirected to the Customer Dashboard.

#### Step 6: Browse and Add to Cart
1. You should see \"Fresh Groceries Store\" in the shops list
2. Click on the shop card
3. A dialog will open showing all products
4. Click **\"Add to Cart\"** on:
   - Fresh Tomatoes (x2)
   - Fresh Milk (x1)
   - Rice (x1)
5. Close the products dialog
6. Click **\"Cart (3)\"** button

#### Step 7: Place Order
1. Review your cart items
2. Verify delivery location is set
3. Click **\"Place Order (Cash on Delivery)\"**

✅ Order placed successfully!

#### Step 8: Assign Delivery Agent (as Shop Owner)
1. **Logout** from customer account
2. **Login** as shop owner:
   - Email: shopowner@test.com
   - Password: Test123!
3. In the dashboard, scroll down to **\"Orders\"** section
4. You should see the order with status **\"PENDING\"**
5. Click on the **\"Assign Delivery Agent\"** dropdown
6. Select **\"Mike Delivery Agent\"** from the list
7. The order status should change to **\"ASSIGNED\"**

✅ Delivery agent assigned!

#### Step 9: Update Delivery Status (as Delivery Agent)
1. **Logout** from shop owner account
2. **Login** as delivery agent:
   - Email: agent@test.com
   - Password: Test123!
3. You should see the assigned order in **\"Active Deliveries\"**
4. Click **\"Mark as Picked Up\"** button
5. Order status changes to **\"PICKED UP\"**
6. Click **\"Mark as Delivered\"** button
7. Order status changes to **\"DELIVERED\"**
8. Order moves to **\"Completed Deliveries\"** section

✅ Delivery completed!

#### Step 10: Verify Order Status (as Customer)
1. **Logout** from delivery agent account
2. **Login** as customer:
   - Email: customer@test.com
   - Password: Test123!
3. Click **\"My Orders\"** button
4. You should see your order with status **\"DELIVERED\"**

✅ **End-to-End Test Complete!** 🎉

---

## Testing Checklist

Use this checklist to verify all features:

### Authentication & Authorization
- [ ] Register as Customer
- [ ] Register as Shop Owner
- [ ] Register as Delivery Agent
- [ ] Login with email/password
- [ ] Logout functionality
- [ ] Protected routes (can't access other role dashboards)

### Customer Features
- [ ] Browse shops
- [ ] View shop products
- [ ] Add products to cart
- [ ] Remove products from cart
- [ ] Place order
- [ ] View order history
- [ ] Track order status
- [ ] Set delivery location (manual)
- [ ] Set delivery location (auto-detect)

### Shop Owner Features
- [ ] Create shop
- [ ] Add products
- [ ] View products list
- [ ] View incoming orders
- [ ] Assign delivery agent to order
- [ ] See order status updates

### Delivery Agent Features
- [ ] View assigned deliveries
- [ ] Update delivery status to \"Picked Up\"
- [ ] Update delivery status to \"Delivered\"
- [ ] View completed deliveries
- [ ] See delivery statistics

### UI/UX
- [ ] Mobile responsive design
- [ ] Navigation works correctly
- [ ] Buttons and forms functional
- [ ] Error messages display correctly
- [ ] Success messages display correctly
- [ ] Loading states work

---

## API Testing (Optional)

You can also test the API directly using the interactive documentation:

### Access API Docs
Open http://localhost:8001/docs in your browser

### Test APIs Using cURL

**Register User:**
```bash
curl -X POST \"http://localhost:8001/api/auth/register\" \\
  -H \"Content-Type: application/json\" \\
  -d '{
    \"email\": \"test@example.com\",
    \"password\": \"testpass123\",
    \"phone\": \"+1234567890\",
    \"name\": \"Test User\",
    \"role\": \"customer\",
    \"location\": {\"address\": \"Test Address\", \"lat\": 0, \"lng\": 0}
  }'
```

**Login:**
```bash
curl -X POST \"http://localhost:8001/api/auth/login\" \\
  -H \"Content-Type: application/json\" \\
  -d '{
    \"email\": \"test@example.com\",
    \"password\": \"testpass123\"
  }'
```

Copy the `token` from the response and use it for authenticated requests:

**Get Current User:**
```bash
curl -X GET \"http://localhost:8001/api/auth/me\" \\
  -H \"Authorization: Bearer YOUR_TOKEN_HERE\"
```

**Get All Shops:**
```bash
curl -X GET \"http://localhost:8001/api/shops\"
```

---

## Troubleshooting

### Issue: MongoDB Connection Failed

**Symptoms:**
```
pymongo.errors.ServerSelectionTimeoutError: localhost:27017: [Errno 111] Connection refused
```

**Solutions:**

1. **Check if MongoDB is running:**
```bash
# Linux:
sudo systemctl status mongod

# macOS:
brew services list

# Start MongoDB if stopped:
# Linux:
sudo systemctl start mongod

# macOS:
brew services start mongodb-community@7.0
```

2. **Check MongoDB connection string in `.env`:**
```env
# Should be:
MONGO_URL=mongodb://localhost:27017
```

3. **Test MongoDB connection:**
```bash
mongosh
```

---

### Issue: Port Already in Use

**Symptoms:**
```
ERROR: Address already in use
```

**Solutions:**

```bash
# Find process using port 8001 (backend)
lsof -ti:8001

# Kill the process
kill -9 $(lsof -ti:8001)

# Or for port 3000 (frontend)
kill -9 $(lsof -ti:3000)
```

**Windows:**
```bash
# Find process
netstat -ano | findstr :8001

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

---

### Issue: Module Not Found Errors

**Backend Error:**
```
ModuleNotFoundError: No module named 'fastapi'
```

**Solution:**
```bash
cd backend
source venv/bin/activate  # Activate virtual environment
pip install -r requirements.txt
```

**Frontend Error:**
```
Module not found: Can't resolve '@/components/ui/button'
```

**Solution:**
```bash
cd frontend
yarn install
```

---

### Issue: CORS Error in Browser

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

1. Check `backend/.env`:
```env
CORS_ORIGINS=http://localhost:3000
```

2. If using different port, update accordingly:
```env
CORS_ORIGINS=http://localhost:3001
```

3. For development, you can allow all origins (not recommended for production):
```env
CORS_ORIGINS=*
```

4. Restart backend server after changing `.env`

---

### Issue: Frontend Can't Connect to Backend

**Symptoms:**
```
Network Error or Failed to fetch
```

**Solutions:**

1. **Verify backend is running:**
   - Check Terminal 1 shows: `Uvicorn running on http://0.0.0.0:8001`
   - Open http://localhost:8001/docs in browser

2. **Check frontend `.env`:**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

3. **Restart frontend server** after changing `.env`:
```bash
# Stop server (Ctrl+C)
# Start again
yarn start
```

---

### Issue: JWT Token Errors

**Symptoms:**
```
401 Unauthorized or Invalid token
```

**Solutions:**

1. **Clear browser localStorage:**
   - Open Developer Tools (F12)
   - Go to Application tab → Local Storage
   - Clear all items
   - Refresh page and login again

2. **Check JWT_SECRET in backend/.env:**
   - Make sure it's set and not empty
   - Generate new secret if needed

---

### Issue: Auto-detect Location Not Working

**Symptoms:**
Location auto-detect button doesn't work

**Reasons:**
- Browser geolocation only works on HTTPS or localhost
- User denied location permission

**Solutions:**

1. **Make sure you're on localhost** (not 127.0.0.1)
2. **Check browser permissions:**
   - Click lock icon in address bar
   - Allow location access
3. **Use manual location entry** as fallback

---

### Issue: Virtual Environment Not Activating

**Symptoms:**
```
venv/bin/activate: No such file or directory
```

**Solution:**
```bash
# Recreate virtual environment
cd backend
python3 -m venv venv

# Make sure you have python3-venv installed (Linux)
sudo apt install python3-venv

# Activate again
source venv/bin/activate
```

---

## Performance Tips

### Development Mode
- Use `--reload` flag for auto-restart on code changes
- Keep browser DevTools open to see network requests
- Use React Developer Tools extension

### Database
- Use indexes for better query performance (implement in production)
- Regularly backup your MongoDB data
- Use MongoDB Compass for visual database management

### Logs
- Backend logs appear in Terminal 1
- Frontend console logs appear in browser DevTools
- MongoDB logs: `tail -f /var/log/mongodb/mongod.log` (Linux)

---

## Next Steps

After successful local testing:

1. **Add More Features:**
   - Review system (already in backend)
   - Search and filters
   - Order history filters
   - Push notifications

2. **Improve Security:**
   - Add rate limiting
   - Implement HTTPS
   - Add input validation
   - Sanitize user inputs

3. **Deploy to Production:**
   - Deploy backend to Railway/Render/Heroku
   - Deploy frontend to Vercel/Netlify
   - Use MongoDB Atlas for production database

4. **Set Up CI/CD:**
   - GitHub Actions for automated testing
   - Automated deployments

---

## Useful Commands

### Backend Commands
```bash
# Start backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Run with different port
uvicorn server:app --host 0.0.0.0 --port 8002 --reload

# Check installed packages
pip list

# Update requirements.txt
pip freeze > requirements.txt
```

### Frontend Commands
```bash
# Start development server
yarn start

# Build for production
yarn build

# Run tests
yarn test

# Add new package
yarn add package-name

# Remove package
yarn remove package-name
```

### MongoDB Commands
```bash
# Connect to MongoDB
mongosh

# Show databases
show dbs

# Use specific database
use samaandena_db

# Show collections
show collections

# Find all users
db.users.find()

# Find all shops
db.shops.find()

# Count orders
db.orders.countDocuments()

# Clear a collection (careful!)
db.users.deleteMany({})
```

---

## Support

If you encounter issues not covered here:
1. Check the API documentation at http://localhost:8001/docs
2. Review browser console for frontend errors
3. Check backend terminal for server errors
4. Verify all environment variables are set correctly
5. Ensure all prerequisites are installed

---

**Happy Developing! 🚀**

Built with ❤️ for rural communities
