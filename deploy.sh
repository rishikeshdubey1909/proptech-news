#!/bin/bash
# Simple deployment script for single-host setup

set -e

echo "🚀 Deploying PropTech News..."

# Navigate to project directory
cd /home/youruser/proptech-news

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build Next.js
echo "🔨 Building Next.js app..."
npm run build

# Restart PM2
echo "🔄 Restarting application..."
pm2 restart proptech-news

echo "✅ Deployment complete!"
echo "📊 Check status: pm2 status"
echo "📝 View logs: pm2 logs proptech-news"
