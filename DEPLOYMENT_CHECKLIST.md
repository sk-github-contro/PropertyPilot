# 🚀 Deployment Checklist

## ✅ Completed Steps
- [x] Code committed to git
- [x] Pushed to GitHub: https://github.com/sk-github-contro/PropertyPilot.git
- [x] Deployment configuration files created
- [x] Environment variables configured

## 🎯 Next Steps

### 1. Deploy Backend to Render (5-10 minutes)

**Go to:** https://render.com

**Steps:**
1. Sign up/Login with GitHub
2. Click "New +" → "Web Service"
3. Connect repository: `sk-github-contro/PropertyPilot`
4. Configure:
   - **Name**: `property-pilot-api`
   - **Environment**: `Node`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `mongodb+srv://sohamUlwe305:Soham305Ulwe@clusterulwe.49hjd.mongodb.net/propertypilot?retryWrites=true&w=majority&appName=clusterUlwe`
6. Click "Create Web Service"
7. **Wait for deployment** (5-10 minutes)
8. **Note your Render URL** (e.g., `https://property-pilot-api.onrender.com`)

### 2. Deploy Frontend to Vercel (2-3 minutes)

**Go to:** https://vercel.com

**Steps:**
1. Sign up/Login with GitHub
2. Click "New Project"
3. Import repository: `sk-github-contro/PropertyPilot`
4. Configure:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variable:
   - `REACT_APP_API_URL`: `https://property-pilot-api.onrender.com/api`
   (Replace with your actual Render URL from step 1)
6. Click "Deploy"
7. **Wait for deployment** (2-3 minutes)
8. **Note your Vercel URL** (e.g., `https://property-pilot.vercel.app`)

### 3. Test Deployment

**Test Backend:**
- Visit: `https://property-pilot-api.onrender.com/api/health`
- Should return: `{"message":"Property Pilot API is running!"}`

**Test Frontend:**
- Visit your Vercel URL
- Should load the Property Pilot homepage
- Try adding a property to test API integration

### 4. Seed Production Database

**Option A: Use the seed script**
```bash
cd server
node seed.js
```

**Option B: Add properties via frontend**
- Use the "Add Property" form in your deployed app

## 🎉 Success!

Once both deployments are complete, your Property Pilot app will be live on the internet!

**Share your deployed app:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://property-pilot-api.onrender.com`

## 🚨 Troubleshooting

**Common Issues:**
1. **CORS Errors**: Backend automatically handles CORS for all origins
2. **Build Failures**: Check build logs in Vercel/Render dashboards
3. **Environment Variables**: Double-check all variables are set correctly
4. **Database Connection**: MongoDB Atlas should work automatically

**Render Free Tier Notes:**
- Services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- Consider upgrading for production use

## 📞 Need Help?

- Check the detailed `DEPLOYMENT.md` file
- Review build logs in Vercel/Render dashboards
- Test API endpoints individually
