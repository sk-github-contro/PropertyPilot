#!/bin/bash

echo "🚀 Property Pilot Deployment Helper"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized. Run 'git init' first."
    exit 1
fi

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    git status --short
    echo ""
    read -p "Do you want to commit all changes now? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Update: $(date)"
        echo "✅ Changes committed"
    else
        echo "❌ Please commit your changes before deploying"
        exit 1
    fi
fi

echo "📋 Deployment Checklist:"
echo "1. ✅ Code committed to git"
echo "2. 🔄 Push to GitHub repository"
echo "3. 🌐 Deploy backend to Render"
echo "4. ⚡ Deploy frontend to Vercel"
echo ""

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "📝 GitHub Repository Setup:"
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository named 'property-pilot'"
    echo "3. Copy the repository URL"
    echo ""
    read -p "Enter your GitHub repository URL: " REPO_URL
    git remote add origin $REPO_URL
    echo "✅ Remote origin added"
fi

echo "🔄 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub successfully!"
    echo ""
    echo "🎯 Next Steps:"
    echo ""
    echo "1. 🌐 Deploy Backend to Render:"
    echo "   - Go to https://render.com"
    echo "   - Connect your GitHub repository"
    echo "   - Create new Web Service"
    echo "   - Root Directory: server"
    echo "   - Build Command: npm install"
    echo "   - Start Command: npm start"
    echo "   - Add environment variables:"
    echo "     * NODE_ENV: production"
    echo "     * MONGODB_URI: mongodb+srv://sohamUlwe305:Soham305Ulwe@clusterulwe.49hjd.mongodb.net/propertypilot?retryWrites=true&w=majority&appName=clusterUlwe"
    echo ""
    echo "2. ⚡ Deploy Frontend to Vercel:"
    echo "   - Go to https://vercel.com"
    echo "   - Import your GitHub repository"
    echo "   - Root Directory: client"
    echo "   - Add environment variable:"
    echo "     * REACT_APP_API_URL: https://your-render-app.onrender.com/api"
    echo ""
    echo "3. 📊 Seed Production Database:"
    echo "   - After backend deployment, run the seed script"
    echo "   - Or add properties through the frontend"
    echo ""
    echo "📖 For detailed instructions, see DEPLOYMENT.md"
else
    echo "❌ Failed to push to GitHub. Please check your repository URL and try again."
fi
