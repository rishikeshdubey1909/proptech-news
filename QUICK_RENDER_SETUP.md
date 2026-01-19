# Quick Setup: WordPress for Render-Hosted Next.js

## 🚀 Fastest Method (5 minutes)

### Step 1: Create WordPress.com Site

1. Go to https://wordpress.com
2. Sign up (free)
3. Create site: `yoursitename.wordpress.com`
4. Done! ✅

### Step 2: Install Plugins

1. Go to: `https://yoursitename.wordpress.com/wp-admin`
2. Plugins → Add New
3. Install: **WPGraphQL**
4. Activate it

### Step 3: Add to Render

1. Go to Render Dashboard
2. Select your Next.js service
3. Environment tab
4. Add variable:
   ```
   NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://yoursitename.wordpress.com/graphql
   ```
5. Save (auto-redeploys)

### Step 4: Test

1. Wait for Render to redeploy (~2 minutes)
2. Visit your Render URL
3. WordPress content should appear!

---

## ✅ That's It!

Your Next.js app on Render will now fetch content from WordPress.

**Total Time:** ~5 minutes
**Cost:** Free (WordPress.com free tier)

---

## 📝 Next Steps

- Create content in WordPress admin
- It will appear on your Render site automatically
- See `RENDER_WORDPRESS_SETUP.md` for advanced setup
