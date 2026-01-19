# How to Access WordPress CMS

## WordPress Admin Dashboard URL

Once WordPress is installed, access the CMS admin at:

```
https://yourwordpresssite.com/wp-admin
```

Or for local development:

```
http://localhost/wp-admin
```

## First-Time Setup

### If WordPress is NOT Installed Yet

You need to install WordPress first. Choose one option:

#### Option 1: Local Development (Recommended for Testing)

**Using Local by Flywheel:**
1. Download: https://localwp.com/
2. Create a new site
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

**Using MAMP/XAMPP:**
1. Install MAMP or XAMPP
2. Download WordPress
3. Place in `htdocs` folder
4. Access: `http://localhost/wordpress/wp-admin`

#### Option 2: WordPress.com (Easiest)

1. Go to https://wordpress.com
2. Sign up for free account
3. Create a new site
4. Access admin at: `https://yoursitename.wordpress.com/wp-admin`

#### Option 3: Production Hosting

1. Purchase hosting (WP Engine, Kinsta, SiteGround, etc.)
2. Install WordPress through hosting panel
3. Access: `https://yourdomain.com/wp-admin`

## Login Credentials

### First-Time Login

After WordPress installation, you'll need:

1. **Username** - Created during installation
2. **Password** - Set during installation
3. **Email** - Used for password reset

### If You Forgot Password

1. Go to: `https://yourwordpresssite.com/wp-admin`
2. Click "Lost your password?"
3. Enter your email or username
4. Check email for reset link

### Create New Admin User (via Database)

If you need to create an admin user manually:

```sql
-- Run in MySQL/phpMyAdmin
INSERT INTO wp_users (user_login, user_pass, user_email, user_registered)
VALUES ('admin', MD5('yourpassword'), 'admin@example.com', NOW());

INSERT INTO wp_usermeta (user_id, meta_key, meta_value)
VALUES (LAST_INSERT_ID(), 'wp_capabilities', 'a:1:{s:13:"administrator";b:1;}');

INSERT INTO wp_usermeta (user_id, meta_key, meta_value)
VALUES (LAST_INSERT_ID(), 'wp_user_level', '10');
```

## What You'll See in WordPress Admin

Once logged in, you'll see:

### Main Dashboard
- **Posts** → Articles (after custom post type setup)
- **Media** → Upload images, PDFs
- **Pages** → Static pages
- **Comments** → (Disabled for headless)
- **Appearance** → (Not used for headless)
- **Plugins** → Install required plugins
- **Users** → Manage editors, contributors
- **Settings** → WordPress configuration

### After Setup (Custom Post Types)

You'll also see:
- **Articles** → Main content type
- **Founder Interviews** → Interview posts
- **Sponsored Stories** → Sponsored content
- **Reports** → Report posts
- **Jobs** → Job listings

## Required Setup Steps

### 1. Install Required Plugins

Go to **Plugins → Add New** and install:

- WPGraphQL
- Advanced Custom Fields (ACF)
- WPGraphQL for Advanced Custom Fields
- Custom Post Type UI (optional)
- Wordfence Security
- Disable XML-RPC

### 2. Activate Plugins

Go to **Plugins → Installed Plugins** and activate all required plugins.

### 3. Configure WPGraphQL

1. Go to **GraphQL → Settings**
2. Enable GraphQL endpoint
3. Set query depth limit: 10
4. Set complexity limit: 1000

### 4. Create Custom Post Types

Add the code from `custom-post-types.php` to your theme's `functions.php` or create a plugin.

### 5. Create ACF Field Groups

1. Go to **Custom Fields → Field Groups**
2. Create field groups as defined in `acf-field-groups.json`
3. Set location rules to appropriate post types

## Testing CMS Access

### Test Admin Login
```
✅ Can access: https://yourwordpresssite.com/wp-admin
✅ Can log in with credentials
✅ Can see dashboard
```

### Test Content Creation
```
✅ Can create new Article
✅ Can see ACF fields in editor
✅ Can upload featured image
✅ Can assign categories
✅ Can save as draft
✅ Can publish
```

### Test API Access
```
✅ REST API: https://yourwordpresssite.com/wp-json/wp/v2/article
✅ GraphQL: https://yourwordpresssite.com/graphql
```

## Security Best Practices

1. **Use Strong Password**
   - Minimum 12 characters
   - Mix of letters, numbers, symbols

2. **Enable 2FA**
   - Install Wordfence Security
   - Enable 2FA for admin accounts

3. **Limit Login Attempts**
   - Configure in Wordfence
   - Block after 5 failed attempts

4. **Change Admin Username**
   - Don't use "admin" as username
   - Create new admin user, delete default

5. **Regular Updates**
   - Keep WordPress core updated
   - Keep plugins updated
   - Keep themes updated

## Troubleshooting

### Can't Access wp-admin

**403 Forbidden:**
- Check file permissions
- Check .htaccess file
- Contact hosting support

**404 Not Found:**
- Check permalink structure (Settings → Permalinks)
- Save permalinks again

**500 Internal Server Error:**
- Check error logs
- Disable plugins one by one
- Check PHP version (needs 8.1+)

### Forgot Admin Password

1. Use "Lost Password" link
2. Or reset via database (see above)
3. Or use WP-CLI: `wp user update admin --user_pass=newpassword`

### Can't See Custom Post Types

1. Check if code is in `functions.php`
2. Check if plugins are activated
3. Clear cache
4. Check user permissions

## Quick Access Links

- **Admin Dashboard**: `/wp-admin`
- **REST API**: `/wp-json/wp/v2`
- **GraphQL**: `/graphql`
- **GraphiQL IDE**: `/graphql` (if enabled)
- **ACF Fields**: `/wp-admin/edit.php?post_type=acf-field-group`

## Next Steps After Accessing CMS

1. ✅ Install and activate required plugins
2. ✅ Configure WPGraphQL settings
3. ✅ Add custom post type code
4. ✅ Create ACF field groups
5. ✅ Create test article
6. ✅ Test GraphQL query
7. ✅ Connect Next.js frontend

---

## Need Help?

- **WordPress Support**: https://wordpress.org/support/
- **WPGraphQL Docs**: https://www.wpgraphql.com/docs/
- **ACF Docs**: https://www.advancedcustomfields.com/resources/
