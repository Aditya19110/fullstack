#!/bin/bash

echo "Setting up Fullstack Task Management Application..."
echo "======================================================"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "Checking prerequisites..."

if ! command_exists node; then
    echo "Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

if ! command_exists npm; then
    echo "npm is not installed. Please install npm"
    exit 1
fi

echo "Node.js and npm are installed"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."

echo "Installing backend dependencies..."
cd backend && npm install
cd ..

echo "Installing frontend dependencies..."
cd frontend && npm install
cd ..

echo "All dependencies installed successfully!"

# Check MongoDB
echo ""
echo "Checking MongoDB..."
if command_exists mongod; then
    echo "MongoDB is installed"
else
    echo "MongoDB is not installed locally"
    echo "   You can either:"
    echo "   1. Install MongoDB: https://docs.mongodb.com/manual/installation/"
    echo "   2. Use Docker: docker-compose up (recommended)"
fi

# Check environment files
echo ""
echo "Setting up environment configuration..."

if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo ".env file created!"
    echo "Please edit .env with your actual configuration values:"
    echo "   - MongoDB connection string"
    echo "   - JWT secret key" 
    echo "   - Firebase configuration (both backend and frontend)"
else
    echo ".env file already exists"
fi

# Firebase setup reminder
echo ""
echo "Firebase Setup Reminder:"
echo "1. Go to Firebase Console: https://console.firebase.google.com/"
echo "2. Select project: sessions-marketplace"
echo "3. Go to Authentication > Sign-in method"
echo "4. Enable Google authentication"
echo "5. Your configuration is already set in .env files"

echo ""
echo "Setup Complete!"
echo ""
echo "To start the project:"
echo "   Development mode: npm run dev"
echo "   Docker mode: docker-compose up"
echo ""
echo "Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5001"
echo "   MongoDB: localhost:27017"
echo ""
echo "Test the application:"
echo "   1. Register a new user or use Google OAuth"
echo "   2. Create, read, update, delete tasks"
echo "   3. Check JWT token in browser DevTools > Application > Local Storage"