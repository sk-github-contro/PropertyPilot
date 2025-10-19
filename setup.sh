#!/bin/bash

echo "🏠 Setting up Property Pilot..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd ../client && npm install

# Create .env file for server
echo "⚙️ Creating server environment file..."
cd ../server
if [ ! -f .env ]; then
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/propertypilot
NODE_ENV=development
EOF
    echo "✅ Created .env file"
else
    echo "⚠️ .env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Run 'npm run dev' to start both frontend and backend"
echo "3. Optional: Run 'cd server && node seed.js' to add sample data"
echo ""
echo "The app will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://localhost:5000"
