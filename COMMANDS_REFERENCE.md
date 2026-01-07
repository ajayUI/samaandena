# ⚡ Quick Setup Commands - Copy & Paste

## Prerequisites Installation

### Ubuntu/Debian
```bash
# Install Python 3.11, Node.js, Yarn, and MongoDB
sudo apt update
sudo apt install -y python3 python3-pip python3-venv nodejs npm git

# Install Yarn
sudo npm install -g yarn

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### macOS
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install all prerequisites
brew install python@3.11 node yarn git
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

---

## Setup Commands (After Extracting Zip)

### Terminal 1: Backend Setup
```bash
# Navigate to backend
cd samaandena-app/backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env

# Generate JWT secret and update .env
echo "JWT_SECRET=$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')" >> .env

# Start backend (keep this terminal running)
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Terminal 2: Frontend Setup
```bash
# Navigate to frontend (in new terminal)
cd samaandena-app/frontend

# Install dependencies
yarn install

# Setup environment
cp .env.example .env

# Start frontend (keep this terminal running)
yarn start
```

---

## Quick Test Commands

### Verify Backend is Running
```bash
curl http://localhost:8001/api/
# Should return: {"message":"SamaanDena API","status":"running"}
```

### Verify MongoDB is Running
```bash
mongosh
# Type 'exit' to quit
```

### Check Frontend
```bash
# Open in browser
open http://localhost:3000  # macOS
xdg-open http://localhost:3000  # Linux
start http://localhost:3000  # Windows
```

---

## Test User Creation (API)

### Create Shop Owner
```bash
curl -X POST "http://localhost:8001/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@test.com",
    "password": "Test123!",
    "phone": "+1234567890",
    "name": "Shop Owner",
    "role": "shop_owner",
    "location": {"address": "123 Main St", "lat": 0, "lng": 0}
  }'
```

### Login and Get Token
```bash
curl -X POST "http://localhost:8001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@test.com",
    "password": "Test123!"
  }'
```

---

## MongoDB Commands

### Connect to MongoDB
```bash
mongosh
```

### Common MongoDB Operations
```javascript
// Show all databases
show dbs

// Use SamaanDena database
use samaandena_db

// Show all collections
show collections

// Count users
db.users.countDocuments()

// Find all users (limit 5)
db.users.find().limit(5)

// Find all shops
db.shops.find()

// Count orders
db.orders.countDocuments()

// Find orders with status
db.orders.find({status: "pending"})

// Clear all data (CAUTION!)
db.users.deleteMany({})
db.shops.deleteMany({})
db.products.deleteMany({})
db.orders.deleteMany({})
db.reviews.deleteMany({})
```

---

## Troubleshooting Commands

### Kill Processes on Port
```bash
# Kill backend (port 8001)
lsof -ti:8001 | xargs kill -9

# Kill frontend (port 3000)
lsof -ti:3000 | xargs kill -9

# Windows alternative
netstat -ano | findstr :8001
taskkill /PID <PID> /F
```

### Restart MongoDB
```bash
# Linux
sudo systemctl restart mongod
sudo systemctl status mongod

# macOS
brew services restart mongodb-community@7.0
brew services list
```

### Check Service Status
```bash
# Check if backend is responding
curl http://localhost:8001/api/

# Check if MongoDB is running
mongosh --eval "db.runCommand({ ping: 1 })"

# Check Node.js and Python versions
node --version
python3 --version
```

### Clean Install (if issues)
```bash
# Backend - remove and reinstall
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install --no-cache-dir -r requirements.txt

# Frontend - remove and reinstall
cd frontend
rm -rf node_modules yarn.lock
yarn install
```

---

## Development Workflow Commands

### Start Backend (Development)
```bash
cd backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Start Frontend (Development)
```bash
cd frontend
yarn start
```

### Run Tests (when implemented)
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
yarn test
```

### Build for Production
```bash
# Frontend build
cd frontend
yarn build

# Serve production build
npx serve -s build
```

---

## Git Commands (for version control)

### Initialize Git Repository
```bash
cd samaandena-app
git init
git add .
git commit -m "Initial commit - SamaanDena delivery platform"
```

### Create GitHub Repository
```bash
# Create repo on GitHub first, then:
git remote add origin https://github.com/yourusername/samaandena.git
git branch -M main
git push -u origin main
```

---

## Environment Variables Quick Reference

### Backend `.env`
```bash
cat > backend/.env << 'EOF'
MONGO_URL=mongodb://localhost:27017
DB_NAME=samaandena_db
CORS_ORIGINS=http://localhost:3000
JWT_SECRET=your-generated-secret-here
EOF
```

### Frontend `.env`
```bash
cat > frontend/.env << 'EOF'
REACT_APP_BACKEND_URL=http://localhost:8001
EOF
```

---

## One-Command Full Setup (Advanced)

### All-in-One Setup Script
```bash
# Create and run this script
cat > setup.sh << 'SCRIPT'
#!/bin/bash
set -e

echo "🚀 Setting up SamaanDena..."

# Backend setup
echo "📦 Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
JWT_SECRET=$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')
sed -i "s/your-super-secret-key-change-this-in-production-use-random-string/$JWT_SECRET/g" .env
cd ..

# Frontend setup
echo "📦 Setting up frontend..."
cd frontend
yarn install
cp .env.example .env
cd ..

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "Terminal 1: cd backend && source venv/bin/activate && uvicorn server:app --host 0.0.0.0 --port 8001 --reload"
echo "Terminal 2: cd frontend && yarn start"
SCRIPT

chmod +x setup.sh
./setup.sh
```

---

## Quick Commands Cheat Sheet

```bash
# Start everything
cd backend && source venv/bin/activate && uvicorn server:app --host 0.0.0.0 --port 8001 --reload &
cd frontend && yarn start

# Stop everything
killall -9 uvicorn node

# Check everything
curl http://localhost:8001/api/ && curl http://localhost:3000 && mongosh --eval "db.runCommand({ ping: 1 })"

# Fresh start (reset database)
mongosh samaandena_db --eval "db.dropDatabase()"

# View logs
# Backend logs are in terminal
# Frontend logs are in browser console (F12)
# MongoDB logs: tail -f /var/log/mongodb/mongod.log
```

---

## Production Deployment Commands

### Backend (Railway)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
railway variables set MONGO_URL=<your-atlas-url>
railway variables set JWT_SECRET=<your-secret>
```

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
# Follow prompts
# Add environment variable: REACT_APP_BACKEND_URL=<your-backend-url>
```

---

**Copy and paste these commands to quickly set up and run your application!**
