# Single-Host Setup: Next.js + WordPress on Same Server

## 🎯 Simple Architecture

```
Your Server/VPS
├── Next.js App (Port 3000) → yourbrand.com
└── WordPress (Port 80/443) → yourbrand.com/cms (or cms.yourbrand.com)
```

**Both on the same server, connected via localhost or internal network.**

---

## 📁 Recommended Folder Structure

```
/home/youruser/
├── proptech-news/          # Next.js app (your repo)
│   ├── app/
│   ├── components/
│   ├── package.json
│   └── ...
└── wordpress/              # WordPress installation
    ├── wp-admin/
    ├── wp-content/
    ├── wp-config.php
    └── ...
```

---

## 🚀 Setup Steps

### Step 1: Server Requirements

**Minimum:**
- Ubuntu 20.04+ or similar Linux
- 2GB RAM
- Node.js 18+
- PHP 8.1+
- MySQL 8.0+ or MariaDB
- Nginx (recommended) or Apache

**Recommended:**
- 4GB RAM
- 2 CPU cores
- 20GB storage

---

### Step 2: Install Node.js & PM2

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Verify
node --version
pm2 --version
```

---

### Step 3: Install WordPress

```bash
# Create WordPress directory
cd /home/youruser
mkdir wordpress
cd wordpress

# Download WordPress
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz --strip-components=1
rm latest.tar.gz

# Set permissions
sudo chown -R www-data:www-data /home/youruser/wordpress
```

---

### Step 4: Configure WordPress Database

```bash
# Create MySQL database
sudo mysql -u root -p

# In MySQL:
CREATE DATABASE wordpress_db;
CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON wordpress_db.* TO 'wp_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

### Step 5: WordPress Configuration

```bash
cd /home/youruser/wordpress

# Copy config file
cp wp-config-sample.php wp-config.php

# Edit wp-config.php
nano wp-config.php
```

**Add these settings:**

```php
// Database settings
define('DB_NAME', 'wordpress_db');
define('DB_USER', 'wp_user');
define('DB_PASSWORD', 'strong_password_here');
define('DB_HOST', 'localhost');

// Security keys (generate at https://api.wordpress.org/secret-key/1.1/salt/)
// ... paste generated keys here ...

// Headless configuration
define('WP_USE_THEMES', false); // Disable theme rendering

// Allow REST API and GraphQL
define('REST_API_ALLOW_ORIGIN', '*');
```

**Add headless functions** - Create `/home/youruser/wordpress/wp-content/themes/headless/functions.php`:

```php
<?php
// Redirect frontend to admin (headless mode)
add_action('template_redirect', function() {
    if (!is_admin() && !wp_doing_ajax() && !wp_doing_cron()) {
        if (strpos($_SERVER['REQUEST_URI'], '/wp-json/') === false && 
            strpos($_SERVER['REQUEST_URI'], '/graphql') === false) {
            wp_redirect(admin_url());
            exit;
        }
    }
});

// Enable CORS for API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
});

// Disable XML-RPC
add_filter('xmlrpc_enabled', '__return_false');
```

---

### Step 6: Install WordPress Plugins

1. Access WordPress: `http://your-server-ip/wordpress/wp-admin`
2. Complete WordPress installation
3. Install plugins:
   - **WPGraphQL** (from WordPress.org)
   - **Advanced Custom Fields** (ACF)
   - **WPGraphQL for ACF**

---

### Step 7: Setup Next.js App

```bash
# Clone your repo (or upload files)
cd /home/youruser
git clone https://github.com/rishikeshdubey1909/proptech-news.git
cd proptech-news

# Install dependencies
npm install

# Create .env.local
nano .env.local
```

**Add to `.env.local`:**

```env
# WordPress GraphQL (using localhost since same server)
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://localhost/wordpress/graphql

# Or if using domain:
# NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://yourbrand.com/cms/graphql
```

**Build the app:**

```bash
npm run build
```

---

### Step 8: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/proptech-news
```

**Nginx Configuration:**

```nginx
# Next.js Frontend (yourbrand.com)
server {
    listen 80;
    server_name yourbrand.com www.yourbrand.com;

    # Next.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# WordPress CMS (yourbrand.com/cms)
server {
    listen 80;
    server_name yourbrand.com;

    location /cms {
        alias /home/youruser/wordpress;
        try_files $uri $uri/ /cms/index.php?$args;
        
        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $request_filename;
        }
    }

    # Allow GraphQL endpoint
    location /cms/graphql {
        alias /home/youruser/wordpress;
        try_files $uri /cms/index.php?$args;
        
        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $request_filename;
        }
    }
}
```

**Enable and restart:**

```bash
sudo ln -s /etc/nginx/sites-available/proptech-news /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### Step 9: Run Next.js with PM2

```bash
cd /home/youruser/proptech-news

# Start Next.js with PM2
pm2 start npm --name "proptech-news" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# (follow the command it outputs)
```

---

### Step 10: Update WordPress URL in Next.js

Since WordPress is on same server, update `.env.local`:

```env
# For production (same domain)
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://yourbrand.com/cms/graphql

# Or use localhost (faster, internal)
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://localhost/cms/graphql
```

**Rebuild Next.js:**

```bash
cd /home/youruser/proptech-news
npm run build
pm2 restart proptech-news
```

---

## 🔧 Alternative: Subdomain Setup

If you prefer subdomain instead of path:

**WordPress:** `cms.yourbrand.com`
**Next.js:** `yourbrand.com`

**Nginx config:**

```nginx
# Next.js (yourbrand.com)
server {
    listen 80;
    server_name yourbrand.com www.yourbrand.com;
    
    location / {
        proxy_pass http://localhost:3000;
        # ... proxy settings ...
    }
}

# WordPress (cms.yourbrand.com)
server {
    listen 80;
    server_name cms.yourbrand.com;
    
    root /home/youruser/wordpress;
    index index.php;
    
    location / {
        try_files $uri $uri/ /index.php?$args;
    }
    
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
    }
}
```

**Update `.env.local`:**

```env
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://cms.yourbrand.com/graphql
```

---

## 📝 WordPress Headless Configuration

### Disable Public Frontend

**In `wp-config.php`:**

```php
// Disable theme rendering
define('WP_USE_THEMES', false);
```

**In `functions.php` (create if doesn't exist):**

```php
// Redirect all frontend requests to admin
add_action('template_redirect', function() {
    if (!is_admin() && 
        !wp_doing_ajax() && 
        !wp_doing_cron() &&
        strpos($_SERVER['REQUEST_URI'], '/wp-json/') === false &&
        strpos($_SERVER['REQUEST_URI'], '/graphql') === false) {
        wp_redirect(admin_url());
        exit;
    }
});
```

---

## 🧪 Testing

### Test WordPress API

```bash
# REST API
curl http://localhost/cms/wp-json/wp/v2/posts

# GraphQL
curl -X POST http://localhost/cms/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'
```

### Test Next.js

```bash
# Check if running
pm2 status

# Check logs
pm2 logs proptech-news

# Visit your site
curl http://localhost:3000
```

---

## 🔄 Deployment Workflow

### Initial Setup (One Time)

1. ✅ Install Node.js, PHP, MySQL, Nginx
2. ✅ Setup WordPress in `/wordpress`
3. ✅ Clone Next.js repo
4. ✅ Configure Nginx
5. ✅ Start services with PM2

### Regular Updates

**Update Next.js:**

```bash
cd /home/youruser/proptech-news
git pull
npm install
npm run build
pm2 restart proptech-news
```

**Update WordPress:**

- Use WordPress admin: `https://yourbrand.com/cms/wp-admin`
- Or SSH and update plugins manually

---

## 🔒 Security Basics

### 1. Firewall

```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 2. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourbrand.com -d www.yourbrand.com -d cms.yourbrand.com
```

### 3. WordPress Security

- Strong passwords
- Limit login attempts plugin
- Regular updates
- Disable file editing in `wp-config.php`:
  ```php
  define('DISALLOW_FILE_EDIT', true);
  ```

---

## 📊 Monitoring

### Check Services

```bash
# PM2 status
pm2 status

# Nginx status
sudo systemctl status nginx

# PHP-FPM status
sudo systemctl status php8.1-fpm

# MySQL status
sudo systemctl status mysql
```

### View Logs

```bash
# Next.js logs
pm2 logs proptech-news

# Nginx logs
sudo tail -f /var/log/nginx/error.log

# WordPress logs
tail -f /home/youruser/wordpress/wp-content/debug.log
```

---

## 🎯 Summary

**Structure:**
```
Server
├── /home/youruser/proptech-news/  → Next.js (Port 3000)
└── /home/youruser/wordpress/      → WordPress (Nginx → PHP-FPM)
```

**URLs:**
- Frontend: `https://yourbrand.com` → Next.js
- CMS: `https://yourbrand.com/cms` → WordPress admin
- GraphQL: `https://yourbrand.com/cms/graphql` → WordPress API

**Connection:**
- Next.js fetches from: `https://yourbrand.com/cms/graphql`
- Both on same server = fast internal communication

**Simple, single-host, MVP-ready!** ✅
