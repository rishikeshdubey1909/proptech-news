#!/bin/bash
# Automated WordPress Setup Script
# Run this on your server: bash setup-wordpress.sh

set -e

echo "🚀 Setting up WordPress for PropTech News..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   echo "❌ Please don't run as root. Use a regular user."
   exit 1
fi

USER_HOME=$HOME
WORDPRESS_DIR="$USER_HOME/wordpress"
PROJECT_DIR="$USER_HOME/proptech-news"

echo -e "${GREEN}📁 Setting up directories...${NC}"
mkdir -p "$WORDPRESS_DIR"
mkdir -p "$PROJECT_DIR"

# Install WordPress
echo -e "${GREEN}📥 Downloading WordPress...${NC}"
cd "$WORDPRESS_DIR"
if [ ! -f "wp-config.php" ]; then
    wget -q https://wordpress.org/latest.tar.gz
    tar -xzf latest.tar.gz --strip-components=1
    rm latest.tar.gz
    echo -e "${GREEN}✅ WordPress downloaded${NC}"
else
    echo -e "${YELLOW}⚠️  WordPress already exists${NC}"
fi

# Create database
echo -e "${GREEN}🗄️  Setting up database...${NC}"
read -p "MySQL root password: " MYSQL_ROOT_PASS
read -p "Database name [wordpress]: " DB_NAME
DB_NAME=${DB_NAME:-wordpress}
read -p "Database user [wp_user]: " DB_USER
DB_USER=${DB_USER:-wp_user}
read -sp "Database password: " DB_PASS
echo ""

mysql -u root -p"$MYSQL_ROOT_PASS" <<EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

echo -e "${GREEN}✅ Database created${NC}"

# Configure WordPress
echo -e "${GREEN}⚙️  Configuring WordPress...${NC}"
cd "$WORDPRESS_DIR"

if [ ! -f "wp-config.php" ]; then
    cp wp-config-sample.php wp-config.php
    
    # Generate salt keys
    SALT=$(curl -s https://api.wordpress.org/secret-key/1.1/salt/)
    
    # Update wp-config.php
    sed -i "s/database_name_here/$DB_NAME/" wp-config.php
    sed -i "s/username_here/$DB_USER/" wp-config.php
    sed -i "s/password_here/$DB_PASS/" wp-config.php
    sed -i "s/localhost/localhost/" wp-config.php
    
    # Add salt keys
    sed -i "/put your unique phrase here/d" wp-config.php
    echo "$SALT" >> wp-config.php
    
    # Add headless configuration
    cat >> wp-config.php <<'EOL'

// Headless WordPress Configuration
define('WP_USE_THEMES', false);
define('REST_API_ALLOW_ORIGIN', '*');
define('DISALLOW_FILE_EDIT', true);
EOL
    
    echo -e "${GREEN}✅ WordPress configured${NC}"
fi

# Create headless theme directory
mkdir -p "$WORDPRESS_DIR/wp-content/themes/headless"
cp "$PROJECT_DIR/wordpress/functions-single-host.php" "$WORDPRESS_DIR/wp-content/themes/headless/functions.php" 2>/dev/null || echo "// Headless functions" > "$WORDPRESS_DIR/wp-content/themes/headless/functions.php"

# Set permissions
echo -e "${GREEN}🔒 Setting permissions...${NC}"
sudo chown -R www-data:www-data "$WORDPRESS_DIR"
sudo chmod -R 755 "$WORDPRESS_DIR"

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "📝 Next steps:"
echo "1. Visit: http://your-server-ip/wordpress/wp-admin"
echo "2. Complete WordPress installation"
echo "3. Install WPGraphQL plugin"
echo "4. Update .env.local in your Next.js app with WordPress URL"
