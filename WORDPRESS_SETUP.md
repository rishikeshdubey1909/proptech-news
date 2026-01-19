# WordPress CMS Integration Guide

## Current Status
The project currently uses sample data from `lib/data/articles.ts`. WordPress integration is not yet set up.

## Option 1: Headless WordPress (Recommended)

### Step 1: Set Up WordPress

You have two options:

#### A. Use WordPress.com (Easiest)
1. Sign up at [wordpress.com](https://wordpress.com)
2. Create a new site
3. Enable REST API (usually enabled by default)
4. Get your site URL: `https://yoursite.wordpress.com`

#### B. Self-Hosted WordPress
1. Install WordPress on your server/hosting
2. Ensure REST API is enabled (default in WordPress 4.7+)
3. Install a plugin like **WPGraphQL** or use the default REST API
4. Get your WordPress URL: `https://yourdomain.com`

### Step 2: Configure WordPress for Headless

1. **Install Required Plugins** (if using self-hosted):
   - **WPGraphQL** (for GraphQL API) OR
   - **REST API** (built-in, no plugin needed)

2. **Set Up Custom Post Types** (Optional but recommended):
   - Install **Custom Post Type UI** plugin
   - Create a custom post type called "Article" with:
     - Slug: `article`
     - Supports: title, editor, thumbnail, excerpt, custom-fields
     - Taxonomies: categories, tags

3. **Create Custom Fields** (for article metadata):
   - Install **Advanced Custom Fields (ACF)** plugin
   - Create fields for:
     - `featured` (checkbox)
     - `read_time` (number)
     - `category` (select: startups, funding, insights, policy, global)

### Step 3: Get Your WordPress API Endpoint

**REST API Endpoint:**
```
https://yourwordpresssite.com/wp-json/wp/v2/posts
```

**For Custom Post Types:**
```
https://yourwordpresssite.com/wp-json/wp/v2/article
```

**GraphQL Endpoint (if using WPGraphQL):**
```
https://yourwordpresssite.com/graphql
```

## Option 2: Use WordPress.com Headless (No Setup Required)

WordPress.com provides a headless API out of the box:
- REST API: `https://yourblog.wordpress.com/wp-json/wp/v2/posts`
- No server management needed
- Free tier available

## Next Steps

1. **Set up your WordPress site** (choose one of the options above)
2. **Get your WordPress URL and API endpoint**
3. **Update environment variables** (see `.env.example`)
4. **Replace data functions** with WordPress API calls (see integration files)

## Integration Files

The following files need to be updated to connect to WordPress:

- `lib/services/wordpress.ts` - WordPress API client
- `lib/data/articles.ts` - Replace sample data with API calls
- `.env.local` - Add WordPress API URL

See the integration guide below for implementation details.
