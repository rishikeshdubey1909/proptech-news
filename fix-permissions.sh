#!/bin/bash

echo "Fixing macOS permissions for Next.js..."

cd "$(dirname "$0")"

# Remove all extended attributes from node_modules
echo "Removing extended attributes..."
find node_modules -type f -exec xattr -c {} \; 2>/dev/null
find node_modules -type d -exec xattr -c {} \; 2>/dev/null

# Set proper permissions
echo "Setting permissions..."
chmod -R u+r node_modules 2>/dev/null

# Clear Next.js cache
echo "Clearing Next.js cache..."
rm -rf .next

echo "Done! Now try: npm run dev"
