# WordPress Setup for Render-Hosted Next.js App

## 🏗️ Architecture Overview

```
GitHub Repo
    ↓
Render (Next.js App) ← Your frontend
    ↓ fetches data
WordPress CMS ← Needs separate hosting
```

**Important:** WordPress needs to be hosted **separately** from your Next.js app on Render.

---

## 🎯 WordPress Hosting Options

### Option 1: WordPress.com (Easiest - Recommended)

**Pros:**
- ✅ Free tier available
- ✅ No server management
- ✅ Automatic updates
- ✅ Built-in REST API and GraphQL support
- ✅ 5-minute setup

**Steps:**
1. Go to https://wordpress.com
2. Sign up (free)
3. Create a new site
4. Your WordPress URL: `https://yoursitename.wordpress.com`
5. Install plugins (WPGraphQL, ACF)
6. Done!

**Cost:** Free (with limitations) or $4/month for better features

---

### Option 2: Render WordPress Service (Separate Service)

**Pros:**
- ✅ Same platform as your Next.js app
- ✅ Easy management
- ✅ Automatic SSL
- ✅ Good performance

**Steps:**
1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Choose "Deploy from Docker Hub"
4. Use WordPress Docker image
5. Configure database (PostgreSQL or MySQL)
6. Deploy

**Cost:** ~$7/month (512MB RAM) + Database costs

---

### Option 3: DigitalOcean App Platform

**Pros:**
- ✅ Simple WordPress hosting
- ✅ Good performance
- ✅ Easy scaling

**Steps:**
1. Sign up at DigitalOcean
2. Create App → WordPress
3. Deploy
4. Get your WordPress URL

**Cost:** ~$5-12/month

---

### Option 4: Traditional WordPress Hosting

**Options:**
- WP Engine ($20/month)
- Kinsta ($35/month)
- SiteGround ($3-10/month)
- Bluehost ($3-10/month)

**Best for:** Production with high traffic

---

## 🚀 Recommended: WordPress.com Setup

### Step 1: Create WordPress Site

1. Go to https://wordpress.com
2. Click "Start your website"
3. Choose a plan (Free works for testing)
4. Pick a domain/subdomain
5. Complete setup

### Step 2: Install Required Plugins

1. Go to `https://yoursitename.wordpress.com/wp-admin`
2. Navigate to **Plugins → Add New**
3. Install these plugins:
   - **WPGraphQL** (search and install)
   - **Advanced Custom Fields** (ACF) - may need Pro for some features
   - **WPGraphQL for Advanced Custom Fields**

4. **Activate** all plugins

### Step 3: Configure WPGraphQL

1. Go to **GraphQL → Settings** in WordPress admin
2. Enable GraphQL endpoint
3. Note your GraphQL URL: `https://yoursitename.wordpress.com/graphql`

### Step 4: Configure Render Environment Variables

1. Go to your Render Dashboard
2. Select your Next.js service
3. Go to **Environment** tab
4. Add environment variable:

```
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://yoursitename.wordpress.com/graphql
```

5. Click **Save Changes**
6. Render will automatically redeploy

### Step 5: Verify Connection

After redeploy, test your site:
- Visit your Render URL
- Check if WordPress content appears
- Run: `npm run check:wordpress` (if you have access to logs)

---

## 🔧 Alternative: Render WordPress Service

### Step 1: Create WordPress on Render

1. **Create Database First:**
   - Render Dashboard → New + → PostgreSQL
   - Name: `wordpress-db`
   - Note the connection string

2. **Create WordPress Service:**
   - New + → Web Service
   - Connect to GitHub (or use Docker)
   - For Docker: Use `wordpress:latest` image
   - Environment variables:
     ```
     WORDPRESS_DB_HOST=your-postgres-host
     WORDPRESS_DB_USER=your-db-user
     WORDPRESS_DB_PASSWORD=your-db-password
     WORDPRESS_DB_NAME=wordpress
     ```

3. **Deploy**

### Step 2: Configure WordPress

1. Access WordPress: `https://your-wordpress-service.onrender.com`
2. Complete WordPress installation
3. Install plugins (WPGraphQL, ACF)
4. Add headless configuration (from `wordpress/functions.php`)

### Step 3: Connect to Next.js

1. In Next.js service on Render
2. Add environment variable:
   ```
   NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://your-wordpress-service.onrender.com/graphql
   ```

---

## 📝 Environment Variables for Render

### In Render Dashboard → Your Next.js Service → Environment:

```env
# WordPress GraphQL (Recommended)
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://yourwordpresssite.com/graphql

# OR WordPress REST API
NEXT_PUBLIC_WORDPRESS_API_URL=https://yourwordpresssite.com
NEXT_PUBLIC_WORDPRESS_POST_TYPE=posts
```

### Important Notes:
- ✅ Use `NEXT_PUBLIC_` prefix (required for client-side access)
- ✅ No quotes needed in Render environment variables
- ✅ Changes require redeploy (automatic on save)

---

## 🔍 Verification Steps

### 1. Test WordPress API

```bash
# Test REST API
curl https://yourwordpresssite.com/wp-json/wp/v2/posts

# Test GraphQL
curl -X POST https://yourwordpresssite.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'
```

### 2. Check Render Logs

1. Go to Render Dashboard
2. Select your Next.js service
3. Click **Logs** tab
4. Look for WordPress connection errors

### 3. Test Your Site

1. Visit your Render URL
2. Check if WordPress content loads
3. If still showing sample data, WordPress isn't connected

---

## 🐛 Troubleshooting

### WordPress Content Not Showing?

1. **Check Environment Variables:**
   - Verify URL is correct in Render
   - No trailing slashes
   - Includes `/graphql` for GraphQL

2. **Check WordPress API:**
   - Test API directly (see commands above)
   - Verify plugins are installed and activated

3. **Check Render Logs:**
   - Look for connection errors
   - Check if environment variables are loaded

4. **Redeploy:**
   - After changing environment variables, Render auto-redeploys
   - Wait for deployment to complete

### CORS Errors?

- WordPress needs CORS headers (included in `wordpress/functions.php`)
- Make sure headless code is added to WordPress

### 404 on GraphQL Endpoint?

- WPGraphQL plugin must be installed and activated
- Check GraphQL settings in WordPress admin

---

## 💡 Recommended Setup for Production

**Best Practice:**
1. **WordPress.com** for CMS (easiest, reliable)
2. **Render** for Next.js frontend (already set up)
3. **Separate services** = Better performance and scaling

**Cost Estimate:**
- WordPress.com: Free or $4/month
- Render Next.js: Free tier or $7/month
- **Total: $0-11/month**

---

## 📚 Next Steps

1. ✅ Choose WordPress hosting option
2. ✅ Install WordPress
3. ✅ Install required plugins
4. ✅ Add environment variable to Render
5. ✅ Wait for Render redeploy
6. ✅ Test your site
7. ✅ Create content in WordPress
8. ✅ Verify it appears on your site

---

## 🆘 Need Help?

- **WordPress Setup**: See `wordpress/HEADLESS_WORDPRESS_SETUP.md`
- **Render Docs**: https://render.com/docs
- **WordPress.com Support**: https://wordpress.com/support
