#!/bin/bash
# Complete Automated Setup - Execute This
# This will set up everything automatically

set -e

echo "🚀 PropTech News - Automated Setup"
echo "==================================="
echo ""

# Check if we're on macOS or Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Detected macOS"
    OS="macos"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🐧 Detected Linux"
    OS="linux"
else
    echo "⚠️  Unknown OS, proceeding anyway..."
    OS="unknown"
fi

# Step 1: Check/Install Node.js
echo ""
echo "📦 Step 1: Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Installing..."
    if [ "$OS" == "macos" ]; then
        echo "   Please install Node.js from: https://nodejs.org/"
        echo "   Or run: brew install node"
        exit 1
    else
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
else
    echo "✅ Node.js $(node --version) found"
fi

# Step 2: Install Next.js dependencies
echo ""
echo "📦 Step 2: Installing Next.js dependencies..."
cd "$(dirname "$0")"
npm install

# Step 3: Build Next.js
echo ""
echo "🔨 Step 3: Building Next.js app..."
npm run build
echo "✅ Next.js built successfully"

# Step 4: Setup WordPress (if Docker available)
echo ""
echo "📦 Step 4: Checking for Docker..."
if command -v docker &> /dev/null; then
    echo "✅ Docker found - Setting up WordPress with Docker..."
    docker-compose up -d
    echo "✅ WordPress starting in Docker..."
    echo "   WordPress: http://localhost:8080/wp-admin"
    echo "   Next.js: http://localhost:3000"
else
    echo "⚠️  Docker not found"
    echo ""
    echo "📝 WordPress Setup Options:"
    echo "   1. Install Docker: https://docs.docker.com/get-docker/"
    echo "   2. Use WordPress.com: https://wordpress.com (free)"
    echo "   3. Manual setup: See SINGLE_HOST_SETUP.md"
    echo ""
    echo "💡 For now, Next.js is ready with sample data!"
fi

# Step 5: Start Next.js
echo ""
echo "🚀 Step 5: Starting Next.js..."
echo ""
echo "✅ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "   1. Start dev server: npm run dev"
echo "   2. Visit: http://localhost:3000"
echo "   3. Setup WordPress (see options above)"
echo ""
echo "🎉 Your Next.js app is ready!"
