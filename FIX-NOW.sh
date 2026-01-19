#!/bin/bash

# Run this script with: bash FIX-NOW.sh
# You may need to enter your password for sudo commands

cd /Users/rishikeshdubey/Downloads/Us/ProjectA

echo "Stopping any running Next.js servers..."
pkill -9 -f "next dev" 2>/dev/null

echo "Removing extended attributes (requires sudo)..."
sudo find node_modules -type f -exec xattr -c {} \; 2>/dev/null
sudo find node_modules -type d -exec xattr -c {} \; 2>/dev/null

echo "Setting permissions..."
sudo chmod -R u+r node_modules 2>/dev/null

echo "Clearing cache..."
rm -rf .next

echo ""
echo "✅ Fixed! Now run: npm run dev"
echo ""
