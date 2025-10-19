# 🚀 Deployment Guide for Property Pilot

This guide will help you deploy your Property Pilot application to Vercel (frontend) and Render (backend).

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Render account (free)
- MongoDB Atlas cluster (already set up)

## 🎯 Deployment Steps

### 1. Push to GitHub

First, let's push your code to GitHub:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Property Pilot app ready for deployment"

# Create repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/property-pilot.git
git branch -M main
git push -u origin main
```

### 2. Deploy Backend to Render

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `property-pilot-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`

5. **Add Environment Variables:**
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `mongodb+srv://sohamUlwe305:Soham305Ulwe@clusterulwe.49hjd.mongodb.net/propertypilot?retryWrites=true&w=majority&appName=clusterUlwe`

6. **Click "Create Web Service"**

7. **Wait for deployment** (5-10 minutes)

8. **Note your Render URL** (e.g., `https://property-pilot-api.onrender.com`)

### 3. Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. **Add Environment Variables:**
   - `REACT_APP_API_URL`: `https://property-pilot-api.onrender.com/api`

6. **Click "Deploy"**

7. **Wait for deployment** (2-3 minutes)

8. **Note your Vercel URL** (e.g., `https://property-pilot.vercel.app`)

### 4. Seed Production Database

After deployment, seed your production database:

```bash
# Update the seed script to use production URL
cd server
node seed.js
```

Or create a simple script to seed via API:

```bash
curl -X POST https://property-pilot-api.onrender.com/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Modern Downtown Apartment",
    "type": "Apartment",
    "price": 450000,
    "location": "Downtown Seattle, WA",
    "description": "Beautiful modern apartment in the heart of downtown Seattle.",
    "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    "bedrooms": 2,
    "bathrooms": 2,
    "area": 1200,
    "coordinates": {"lat": 47.6062, "lng": -122.3321}
  }'
```

## 🔧 Configuration Files

### Backend (Render)
- `server/package.json` - Dependencies and scripts
- `server/render.yaml` - Render configuration (optional)

### Frontend (Vercel)
- `client/vercel.json` - Vercel configuration
- `client/.env` - Environment variables (create this file)

## 🌐 Final URLs

After deployment, your app will be available at:

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend API**: `https://property-pilot-api.onrender.com`
- **API Health**: `https://property-pilot-api.onrender.com/api/health`

## 🎯 Testing Deployment

1. **Test Backend**: Visit `https://property-pilot-api.onrender.com/api/health`
2. **Test Frontend**: Visit your Vercel URL
3. **Test API Integration**: Try adding a property in the frontend
4. **Test Database**: Check if data persists after page refresh

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend has CORS enabled for your Vercel domain
2. **Environment Variables**: Double-check all environment variables are set correctly
3. **Build Failures**: Check the build logs in Vercel/Render dashboards
4. **Database Connection**: Verify MongoDB Atlas allows connections from Render

### Render Free Tier Limitations:
- Services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Consider upgrading to paid plan for production use

## 🎉 Success!

Once deployed, your Property Pilot app will be live on the internet and accessible to anyone!

**Share your deployed app with friends and family!** 🏠✨
