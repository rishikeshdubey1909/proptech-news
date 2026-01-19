#!/bin/bash
# Complete Automated Setup Script
# This sets up everything: WordPress + Next.js on same server

set -e

echo "🚀 PropTech News - Complete Automated Setup"
echo "============================================"

# Check if root
if [ "$EUID" -eq 0 ]; then 
   echo "❌ Don't run as root. Use a regular user with sudo access."
   exit 1
fi

# Install dependencies
echo ""
echo "📦 Step 1: Installing system dependencies..."
sudo apt-get update
sudo apt-get install -y curl wget git nginx mysql-server php8.1-fpm php8.1-mysql php8.1-xml php8.1-curl

# Install Node.js
echo ""
echo "📦 Step 2: Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2
echo ""
echo "📦 Step 3: Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
fi

# Setup WordPress
echo ""
echo "📥 Step 4: Setting up WordPress..."
bash setup-wordpress.sh

# Setup Next.js
echo ""
echo "📥 Step 5: Setting up Next.js..."
cd ~
if [ ! -d "proptech-news" ]; then
    git clone https://github.com/rishikeshdubey1909/proptech-news.git
fi
cd proptech-news
npm install

# Create .env.local
echo ""
echo "⚙️  Step 6: Configuring Next.js..."
read -p "Your domain name (e.g., yourbrand.com): " DOMAIN
cat > .env.local <<EOF
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://$DOMAIN/cms/graphql
EOF

# Build Next.js
echo ""
echo "🔨 Step 7: Building Next.js..."
npm run build

# Setup PM2
echo ""
echo "🔄 Step 8: Starting Next.js with PM2..."
pm2 start npm --name "proptech-news" -- start
pm2 save
pm2 startup

# Setup Nginx
echo ""
echo "🌐 Step 9: Configuring Nginx..."
sudo cp nginx-config.conf /etc/nginx/sites-available/proptech-news
sudo sed -i "s/yourbrand.com/$DOMAIN/g" /etc/nginx/sites-available/proptech-news
sudo sed -i "s|/home/youruser|$HOME|g" /etc/nginx/sites-available/proptech-news
sudo ln -sf /etc/nginx/sites-available/proptech-news /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Visit: https://$DOMAIN/cms/wp-admin"
echo "2. Complete WordPress installation"
echo "3. Install WPGraphQL plugin"
echo "4. Visit: https://$DOMAIN (your Next.js site)"
echo ""
echo "🔍 Check status:"
echo "   pm2 status"
echo "   sudo systemctl status nginx"
