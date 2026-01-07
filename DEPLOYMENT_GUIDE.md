# 🚀 SamaanDena - Production Deployment Guide

## 📋 INFORMATION & CREDENTIALS NEEDED

### 1️⃣ Domain Information
**What I Need:**
- [ ] Your domain name (e.g., samaandena.com)
- [ ] Domain registrar access (GoDaddy, Namecheap, etc.) - for DNS configuration
- [ ] Or just DNS management credentials

### 2️⃣ MongoDB Database (Production)
**Choose One Option:**

**Option A: MongoDB Atlas (Recommended - FREE tier available)**
- [ ] MongoDB Atlas account (create at https://www.mongodb.com/cloud/atlas/register)
- [ ] Connection string after cluster creation
- [ ] Database username and password

**Option B: Your Own MongoDB Server**
- [ ] MongoDB server URL
- [ ] Database credentials
- [ ] Port number

### 3️⃣ Hosting Platform Choice
**Choose One:**

**Option A: Vercel (Frontend) + Railway/Render (Backend) [RECOMMENDED]**
- [ ] GitHub account (to connect repository)
- Free tier available for both
- Easiest setup
- Automatic deployments

**Option B: Single VPS (DigitalOcean, AWS, etc.)**
- [ ] Server IP address
- [ ] SSH credentials
- [ ] More control but requires server management

**Option C: cPanel/Shared Hosting**
- [ ] cPanel login credentials
- [ ] FTP access
- Limited but works for small scale

### 4️⃣ Environment Variables
**You'll need to provide:**
- [ ] JWT Secret (I can generate one for you)
- [ ] MongoDB Connection String (from step 2)
- [ ] Domain name for CORS configuration

---

## 🎯 RECOMMENDED DEPLOYMENT: Vercel + Railway

This is the **EASIEST and FREE** option with automatic deployments.

### Step 1: Setup MongoDB Atlas (FREE)

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up with email

2. **Create Cluster:**
   - Click "Build a Database"
   - Select "M0 FREE" tier
   - Choose region closest to your users (e.g., Mumbai for India)
   - Cluster name: samaandena-prod
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `samaandena_user`
   - Password: (auto-generate strong password) - **SAVE THIS!**
   - Database User Privileges: "Read and write to any database"

4. **Whitelist IP Addresses:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This allows your deployed apps to connect

5. **Get Connection String:**
   - Go to "Database"
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://samaandena_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - **SAVE THIS CONNECTION STRING!**

---

### Step 2: Deploy Backend to Railway (FREE)

1. **Push Code to GitHub:**
   ```bash
   # In your project root
   cd /path/to/samaandena
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create repo on GitHub
   # Then push
   git remote add origin https://github.com/yourusername/samaandena.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Railway:**
   - Go to https://railway.app
   - Sign up with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your samaandena repository
   - Click "Deploy"

3. **Configure Backend Environment Variables:**
   
   In Railway dashboard, go to your project → Variables:
   
   ```env
   MONGO_URL=mongodb+srv://samaandena_user:yourpassword@cluster0.xxxxx.mongodb.net/
   DB_NAME=samaandena_prod
   CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   JWT_SECRET=<generate-secure-random-string>
   PORT=8001
   ```

   **To generate JWT_SECRET:**
   ```bash
   python3 -c "import secrets; print(secrets.token_urlsafe(32))"
   # Example output: kx8vNJ7_YHqpVnQ9_s3wODwN4_xNrLHqRW8-IKs4Bqo
   ```

4. **Configure Railway for Backend:**
   - Root Directory: `/backend`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - Build Command: `pip install -r requirements.txt`

5. **Get Backend URL:**
   - Railway will provide a URL like: `https://samaandena-backend.up.railway.app`
   - **SAVE THIS URL!**

---

### Step 3: Deploy Frontend to Vercel (FREE)

1. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Import your samaandena repository
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Click "Deploy"

2. **Configure Frontend Environment Variables:**
   
   In Vercel dashboard → Settings → Environment Variables:
   
   ```env
   REACT_APP_BACKEND_URL=https://samaandena-backend.up.railway.app
   ```
   
   (Use the Railway backend URL from Step 2)

3. **Get Frontend URL:**
   - Vercel will provide: `https://samaandena.vercel.app`
   - **This is your temporary URL**

---

### Step 4: Connect Your Custom Domain

#### Option A: Connect to Vercel (Frontend)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your domain: `samaandena.com` and `www.samaandena.com`

2. **Configure DNS (at your domain registrar):**
   
   **For Root Domain (samaandena.com):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (Vercel IP)
   
   **For WWW (www.samaandena.com):**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

3. **Wait for DNS Propagation:**
   - Usually takes 5-30 minutes
   - Check: https://dnschecker.org

4. **Vercel Auto-SSL:**
   - Vercel automatically provisions SSL certificate
   - Your site will be available at https://samaandena.com

#### Option B: Custom Domain on Railway (Backend)

1. **In Railway Dashboard:**
   - Go to your backend project
   - Click "Settings" → "Domains"
   - Add custom domain: `api.samaandena.com`

2. **Configure DNS:**
   - Type: `CNAME`
   - Name: `api`
   - Value: (Railway will provide)

3. **Update Frontend Environment:**
   - In Vercel, update `REACT_APP_BACKEND_URL` to `https://api.samaandena.com`
   - Redeploy

---

## 🔧 ALTERNATIVE: VPS Deployment (More Control)

If you have a VPS (DigitalOcean, AWS, Linode, etc.):

### What I Need:
- [ ] Server IP address
- [ ] SSH username and password/key
- [ ] Or root access

### Steps:

1. **Server Setup:**
   ```bash
   # SSH into server
   ssh root@your-server-ip
   
   # Update system
   apt update && apt upgrade -y
   
   # Install dependencies
   apt install -y python3 python3-pip nodejs npm nginx certbot python3-certbot-nginx
   npm install -g yarn pm2
   ```

2. **Clone Repository:**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/samaandena.git
   cd samaandena
   ```

3. **Setup Backend:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   
   # Create .env file
   nano .env
   # Add production environment variables
   
   # Run with PM2
   pm2 start "uvicorn server:app --host 0.0.0.0 --port 8001" --name samaandena-backend
   pm2 save
   pm2 startup
   ```

4. **Setup Frontend:**
   ```bash
   cd ../frontend
   yarn install
   
   # Create production .env
   nano .env
   # Add: REACT_APP_BACKEND_URL=https://yourdomain.com/api
   
   # Build
   yarn build
   ```

5. **Configure Nginx:**
   ```bash
   nano /etc/nginx/sites-available/samaandena
   ```
   
   ```nginx
   server {
       listen 80;
       server_name samaandena.com www.samaandena.com;
       
       # Frontend
       location / {
           root /var/www/samaandena/frontend/build;
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:8001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   # Enable site
   ln -s /etc/nginx/sites-available/samaandena /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

6. **Setup SSL (HTTPS):**
   ```bash
   certbot --nginx -d samaandena.com -d www.samaandena.com
   ```

7. **Configure DNS:**
   - Type: `A`
   - Name: `@`
   - Value: `your-server-ip`
   
   - Type: `A`
   - Name: `www`
   - Value: `your-server-ip`

---

## 📊 COMPARISON TABLE

| Feature | Vercel+Railway | VPS | Shared Hosting |
|---------|---------------|-----|----------------|
| **Cost** | Free tier available | $5-20/month | $3-10/month |
| **Setup Time** | 30 minutes | 2-3 hours | 1-2 hours |
| **Auto Deploy** | Yes (git push) | Manual/Setup CI/CD | Manual |
| **SSL** | Automatic | Manual (Let's Encrypt) | Usually included |
| **Scalability** | Automatic | Manual | Limited |
| **Maintenance** | None | You manage | Hosting manages |
| **Best For** | Quick start, MVP | Full control needed | Small projects |
| **Recommendation** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## ✅ DEPLOYMENT CHECKLIST

### Before Deployment:
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Connection string saved
- [ ] JWT_SECRET generated
- [ ] Domain purchased (if not already)

### Backend Deployment:
- [ ] Railway/VPS account created
- [ ] Backend deployed
- [ ] Environment variables configured
- [ ] Backend URL noted
- [ ] API tested (visit backend-url/api/)

### Frontend Deployment:
- [ ] Vercel account created
- [ ] Frontend deployed
- [ ] REACT_APP_BACKEND_URL configured
- [ ] Deployment successful
- [ ] Temporary URL working

### Domain Configuration:
- [ ] DNS records added
- [ ] SSL certificate active
- [ ] https:// working
- [ ] www and non-www working
- [ ] Backend API accessible

### Post-Deployment Testing:
- [ ] Landing page loads
- [ ] User registration works
- [ ] Login works
- [ ] Shop creation works
- [ ] Product creation works
- [ ] Order placement works
- [ ] Delivery assignment works
- [ ] Mobile view works

---

## 🆘 WHAT TO PROVIDE ME

**To help you deploy, please provide:**

1. **Domain Name:** (e.g., samaandena.com)
2. **Hosting Preference:** 
   - [ ] Vercel + Railway (Recommended - I'll guide you)
   - [ ] VPS (provide SSH access)
   - [ ] Other (specify)
3. **MongoDB:**
   - [ ] I'll create MongoDB Atlas (just need to follow steps)
   - [ ] I have MongoDB server (provide connection string)

**Optional but Helpful:**
- GitHub repository link (if already created)
- Domain registrar (GoDaddy, Namecheap, etc.)
- Any existing hosting accounts

---

## 📞 DEPLOYMENT SUPPORT

**I can help with:**
✅ Creating deployment configurations
✅ Generating environment variables
✅ Writing deployment scripts
✅ DNS configuration guidance
✅ SSL setup instructions
✅ Troubleshooting deployment issues

**You'll need to:**
- Create accounts (GitHub, Railway, Vercel, MongoDB Atlas)
- Provide access credentials when needed
- Update DNS records at your domain registrar
- Test the deployed application

---

## 🚀 QUICK START RECOMMENDATION

**For fastest deployment (30-60 minutes):**

1. Create MongoDB Atlas account (10 min)
2. Push code to GitHub (5 min)
3. Deploy backend to Railway (10 min)
4. Deploy frontend to Vercel (10 min)
5. Configure domain DNS (5 min)
6. Wait for DNS propagation (15-30 min)
7. Test everything (10 min)

**Total Cost:** $0 (using free tiers)

---

## 📧 NEXT STEPS

Please tell me:
1. Your domain name
2. Which deployment option you prefer
3. If you need help with MongoDB Atlas setup

I'll provide step-by-step guidance based on your choice!

---

**Let's get SamaanDena live! 🎉**