# SamaanDena - Quick Start Guide

## 🚀 Fastest Way to Run Locally (5 minutes)

### Prerequisites Check
```bash
# Check Python version (need 3.11+)
python3 --version

# Check Node.js version (need 18+)
node --version

# Check Yarn installation
yarn --version

# Check MongoDB (or use MongoDB Atlas free tier)
mongod --version
```

### Step 1: Extract and Navigate
```bash
unzip samaandena-app.zip
cd samaandena-app
```

### Step 2: Start MongoDB
```bash
# Option A: Local MongoDB
sudo service mongodb start

# Option B: Use MongoDB Atlas (free)
# Get connection string from https://www.mongodb.com/atlas
# Update backend/.env with: MONGO_URL=mongodb+srv://...
```

### Step 3: Backend Setup (Terminal 1)
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

✅ Backend running at: http://localhost:8001
📚 API Docs: http://localhost:8001/docs

### Step 4: Frontend Setup (Terminal 2)
```bash
cd frontend

# Update .env for local development
# Change REACT_APP_BACKEND_URL to: http://localhost:8001

# Install dependencies
yarn install

# Start frontend
yarn start
```

✅ Frontend running at: http://localhost:3000

### Step 5: Test the Application
1. Open http://localhost:3000
2. Click "Get Started"
3. Register as a Customer
4. Try the complete flow!

---

## 🎯 Testing Different Roles

### Test as Customer:
```
1. Register with role: Customer
2. Browse shops (you'll need to create a shop first with shop owner account)
3. Add products to cart
4. Place order
5. View order status
```

### Test as Shop Owner:
```
1. Register with role: Shop Owner
2. Create a shop (provide location)
3. Add products with prices
4. View orders coming in
5. Assign delivery agents to orders
```

### Test as Delivery Agent:
```
1. Register with role: Delivery Agent
2. Wait for shop owner to assign orders
3. View assigned deliveries
4. Update status: Picked Up → Delivered
```

---

## 🔧 Common Issues & Quick Fixes

### "Module not found" error
```bash
# Backend
cd backend && pip install -r requirements.txt

# Frontend  
cd frontend && yarn install
```

### Port already in use
```bash
# Kill process on port 8001
lsof -ti:8001 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### MongoDB connection failed
```bash
# Check MongoDB status
sudo service mongodb status

# Start MongoDB
sudo service mongodb start

# Or use MongoDB Atlas (free cloud option)
```

### CORS errors
- Ensure backend/.env has: `CORS_ORIGINS=http://localhost:3000`
- Or use `CORS_ORIGINS=*` for development

### Frontend can't connect to backend
- Check backend/.env: `MONGO_URL` is correct
- Check frontend/.env: `REACT_APP_BACKEND_URL=http://localhost:8001`
- Verify backend is running on port 8001

---

## 📦 What's Included

### Backend (`/backend`)
- ✅ FastAPI server with JWT authentication
- ✅ User management (3 roles)
- ✅ Shop & product management
- ✅ Order & delivery management
- ✅ Review system
- ✅ MongoDB integration

### Frontend (`/frontend`)
- ✅ React 19 with modern hooks
- ✅ Beautiful UI with Tailwind CSS
- ✅ 3 role-specific dashboards
- ✅ Shopping cart & checkout
- ✅ Real-time order tracking
- ✅ Location selector (manual + auto-detect)
- ✅ Mobile-responsive design

---

## 🌐 Environment Variables

### Backend `.env`
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=samaandena_db
CORS_ORIGINS=http://localhost:3000
JWT_SECRET=change-this-in-production
```

### Frontend `.env`
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## 🎨 Design Features
- Clean, modern aesthetic with Manrope & Inter fonts
- Green color scheme (#16A34A) for trust & freshness
- Mobile-first responsive design
- Smooth animations and transitions
- Accessible components with proper ARIA labels

---

## 📱 Mobile Testing
```bash
# Get your local IP
ifconfig | grep "inet "

# Access from mobile on same network
# Frontend: http://YOUR_IP:3000
# Backend: http://YOUR_IP:8001
```

---

## 🚢 Ready for Production?

### Backend Checklist:
- [ ] Change JWT_SECRET to secure random string
- [ ] Use production MongoDB (MongoDB Atlas)
- [ ] Set specific CORS_ORIGINS (not *)
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up monitoring

### Frontend Checklist:
- [ ] Update REACT_APP_BACKEND_URL to production API
- [ ] Run `yarn build`
- [ ] Deploy to Vercel/Netlify
- [ ] Test all flows in production

---

## 💡 Pro Tips

1. **First-time setup**: Create a shop owner account first, add a shop and products, then test as customer
2. **Testing deliveries**: You need all 3 roles - customer places order, shop owner assigns agent, agent delivers
3. **Location auto-detect**: Works only on HTTPS or localhost
4. **API documentation**: Visit http://localhost:8001/docs for interactive API docs
5. **Database viewing**: Use MongoDB Compass to view data visually

---

## 🆘 Need Help?

1. Check SETUP_INSTRUCTIONS.md for detailed guide
2. Visit http://localhost:8001/docs for API documentation
3. Check browser console for frontend errors
4. Check terminal for backend errors
5. Ensure all environment variables are set correctly

---

**Happy Coding! 🎉**
