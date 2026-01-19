# Quick Start: Connect to WordPress

## Step 1: Set Up WordPress

Choose one option:

### Option A: WordPress.com (Easiest - 5 minutes)
1. Go to [wordpress.com](https://wordpress.com) and sign up
2. Create a new site
3. Your API URL will be: `https://yoursitename.wordpress.com`
4. That's it! The REST API is enabled by default.

### Option B: Self-Hosted WordPress
1. Install WordPress on your hosting/server
2. Your API URL will be: `https://yourdomain.com`
3. REST API is enabled by default in WordPress 4.7+

## Step 2: Configure Your Next.js App

1. **Create `.env.local` file** in the project root:
```bash
cp .env.example .env.local
```

2. **Edit `.env.local`** and add your WordPress URL:
```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://yourwordpresssite.com
NEXT_PUBLIC_WORDPRESS_POST_TYPE=posts
```

3. **Restart your dev server**:
```bash
npm run dev
```

## Step 3: Test the Connection

1. Visit `http://localhost:3000`
2. If WordPress is connected, you'll see your WordPress posts
3. If not connected, you'll see sample data (fallback)

## Step 4: Create Content in WordPress

1. Log into your WordPress admin
2. Create posts with:
   - Title
   - Content
   - Featured image
   - Categories (map to: startups, funding, insights, policy, global)
   - Tags

## Optional: Advanced Custom Fields (ACF)

For better integration, install ACF plugin and create fields:
- `featured` (checkbox) - Mark articles as featured
- `read_time` (number) - Reading time in minutes
- `category` (select) - startups, funding, insights, policy, global

## Troubleshooting

**Not seeing WordPress content?**
- Check `.env.local` has the correct URL
- Verify WordPress REST API is accessible: `https://yourwordpresssite.com/wp-json/wp/v2/posts`
- Check browser console for errors
- Restart Next.js dev server after changing `.env.local`

**API errors?**
- Make sure your WordPress site is publicly accessible
- Check if REST API is enabled (default in WordPress 4.7+)
- For WordPress.com, API is always enabled

## Next Steps

Once connected, you can:
- Create/edit posts in WordPress
- They'll automatically appear on your Next.js site
- Use WordPress admin as your CMS interface
