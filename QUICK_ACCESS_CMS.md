# Quick Guide: Access WordPress CMS

## 🚀 Quick Answer

**WordPress Admin URL:**
```
https://yourwordpresssite.com/wp-admin
```

## 📋 Step-by-Step

### If WordPress is Already Installed

1. **Go to**: `https://yourwordpresssite.com/wp-admin`
2. **Enter** your username and password
3. **Click** "Log In"

### If WordPress is NOT Installed

You need to install WordPress first. Choose one:

#### ✅ Easiest: WordPress.com (5 minutes)

1. Go to https://wordpress.com
2. Sign up (free)
3. Create site
4. Access: `https://yoursitename.wordpress.com/wp-admin`

#### ✅ Local Development: Local by Flywheel

1. Download: https://localwp.com/
2. Install and create new site
3. Access: `http://yoursitename.local/wp-admin`

#### ✅ Production: Hosting Provider

1. Buy hosting (WP Engine, Kinsta, etc.)
2. Install WordPress via hosting panel
3. Access: `https://yourdomain.com/wp-admin`

## 🔑 Login Credentials

**First Time:**
- Username: Created during WordPress installation
- Password: Set during installation

**Forgot Password?**
1. Go to `/wp-admin`
2. Click "Lost your password?"
3. Enter email
4. Check email for reset link

## 🎯 What to Do After Login

1. **Install Plugins** (Plugins → Add New):
   - WPGraphQL
   - Advanced Custom Fields
   - WPGraphQL for ACF
   - Wordfence Security

2. **Create Content** (Articles → Add New):
   - Create your first article
   - Add featured image
   - Assign category
   - Publish

3. **Test API**:
   - REST: `https://yoursite.com/wp-json/wp/v2/article`
   - GraphQL: `https://yoursite.com/graphql`

## 📁 Full Setup Guide

See `wordpress/HEADLESS_WORDPRESS_SETUP.md` for complete setup instructions.

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
