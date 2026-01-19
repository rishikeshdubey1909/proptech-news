# How to Access WordPress CMS

## 🚀 Quick Answer

**WordPress Admin URL:**
```
https://yourwordpresssite.com/wp-admin
```

## 📋 Step-by-Step Guide

### Step 1: Determine Your WordPress URL

**If you have WordPress installed:**
- Production: `https://yourdomain.com/wp-admin`
- WordPress.com: `https://yoursitename.wordpress.com/wp-admin`
- Local: `http://localhost/wp-admin` or `http://yoursitename.local/wp-admin`

### Step 2: Go to Login Page

1. Open your browser
2. Navigate to: `https://yourwordpresssite.com/wp-admin`
3. You'll see the WordPress login page

### Step 3: Enter Credentials

- **Username**: Your WordPress username (created during installation)
- **Password**: Your WordPress password

### Step 4: Access Dashboard

After logging in, you'll see the WordPress admin dashboard where you can:
- Create articles (Posts → Add New)
- Upload media (Media → Add New)
- Install plugins (Plugins → Add New)
- Manage users (Users)
- Configure settings (Settings)

## 🔑 If You Don't Have WordPress Yet

### Option 1: WordPress.com (Easiest - 5 minutes)

1. Go to https://wordpress.com
2. Sign up for free account
3. Create a new site
4. Access: `https://yoursitename.wordpress.com/wp-admin`

### Option 2: Local Development

**Using Local by Flywheel:**
1. Download: https://localwp.com/
2. Install and create new site
3. Access: `http://yoursitename.local/wp-admin`

**Using Docker:**
```bash
docker run -d -p 8080:80 \
  -e WORDPRESS_DB_HOST=db \
  -e WORDPRESS_DB_USER=wordpress \
  -e WORDPRESS_DB_PASSWORD=wordpress \
  wordpress
```
Access: `http://localhost:8080/wp-admin`

### Option 3: Production Hosting

1. Purchase hosting (WP Engine, Kinsta, SiteGround, etc.)
2. Install WordPress via hosting panel
3. Access: `https://yourdomain.com/wp-admin`

## 🔐 Forgot Password?

1. Go to `/wp-admin`
2. Click "Lost your password?"
3. Enter your email or username
4. Check email for reset link

## ✅ After Logging In

### First-Time Setup Checklist

1. **Install Required Plugins:**
   - Go to Plugins → Add New
   - Install: WPGraphQL, Advanced Custom Fields, WPGraphQL for ACF

2. **Configure WPGraphQL:**
   - Go to GraphQL → Settings
   - Enable GraphQL endpoint

3. **Create Content:**
   - Go to Posts → Add New (or Articles if custom post type is set up)
   - Create your first article
   - Add featured image
   - Assign category
   - Publish

4. **Test API:**
   - REST: `https://yoursite.com/wp-json/wp/v2/article`
   - GraphQL: `https://yoursite.com/graphql`

## 📚 Full Setup Guide

For complete WordPress headless CMS setup, see:
- `wordpress/HEADLESS_WORDPRESS_SETUP.md` - Complete setup guide
- `wordpress/ACCESS_CMS.md` - Detailed access instructions
- `wordpress/INSTALLATION_CHECKLIST.md` - Step-by-step checklist

## 🆘 Troubleshooting

**Can't access wp-admin?**
- Check if WordPress is installed
- Try: `https://yoursite.com/wp-login.php`
- Check hosting/domain configuration

**403 Forbidden?**
- Check file permissions
- Contact hosting support

**Need to install WordPress?**
- See installation options above
- Or follow: `wordpress/HEADLESS_WORDPRESS_SETUP.md`
