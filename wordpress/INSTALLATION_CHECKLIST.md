# WordPress Headless CMS Installation Checklist

## Pre-Installation

- [ ] WordPress 6.4+ installed
- [ ] PHP 8.1+ and MySQL 8.0+ configured
- [ ] Server has SSL certificate (HTTPS)
- [ ] Backup strategy in place

## Step 1: WordPress Core Setup

- [ ] WordPress installed and configured
- [ ] Permalink structure set to "Post name"
- [ ] Comments disabled (Settings → Discussion)
- [ ] Timezone configured correctly
- [ ] Site language set

## Step 2: Install Required Plugins

- [ ] **WPGraphQL** installed and activated
- [ ] **Advanced Custom Fields (ACF)** installed and activated
- [ ] **WPGraphQL for Advanced Custom Fields** installed and activated
- [ ] **Custom Post Type UI** installed and activated (optional, for easier management)

## Step 3: Install Security & Performance Plugins

- [ ] **Wordfence Security** installed and configured
- [ ] **Disable XML-RPC** plugin installed
- [ ] **WP Rocket** or **W3 Total Cache** installed
- [ ] **WP GraphQL Smart Cache** installed (optional)

## Step 4: WordPress Configuration

- [ ] Add headless configuration to `wp-config.php`
- [ ] Add `functions.php` code for headless setup
- [ ] Test REST API endpoint: `/wp-json/wp/v2/posts`
- [ ] Test GraphQL endpoint: `/graphql`

## Step 5: Custom Post Types

- [ ] Article post type registered
- [ ] Founder Interview post type registered
- [ ] Sponsored Story post type registered
- [ ] Report post type registered
- [ ] Job post type registered
- [ ] All post types visible in admin
- [ ] All post types accessible via REST API
- [ ] All post types accessible via GraphQL

## Step 6: Taxonomies

- [ ] Article Category taxonomy registered
- [ ] Article Tag taxonomy registered
- [ ] Geography taxonomy registered
- [ ] Default taxonomy terms created
- [ ] Taxonomies visible in admin
- [ ] Taxonomies accessible via REST API
- [ ] Taxonomies accessible via GraphQL

## Step 7: Advanced Custom Fields

- [ ] ACF field group "Article Metadata" created
- [ ] ACF field group "Founder Interview Metadata" created
- [ ] ACF field group "Sponsored Story Metadata" created
- [ ] ACF field group "Report Metadata" created
- [ ] ACF field group "Job Metadata" created
- [ ] All ACF fields visible in post editor
- [ ] ACF fields exposed to GraphQL (via WPGraphQL ACF plugin)

## Step 8: WPGraphQL Configuration

- [ ] GraphQL endpoint accessible at `/graphql`
- [ ] GraphiQL IDE accessible (for testing)
- [ ] Query depth limit set (recommended: 10)
- [ ] Query complexity limit set (recommended: 1000)
- [ ] Test GraphQL query (see graphql-queries.md)

## Step 9: Security Hardening

- [ ] Two-factor authentication enabled for admin/editor accounts
- [ ] XML-RPC disabled
- [ ] Security headers configured
- [ ] Rate limiting configured
- [ ] Strong passwords enforced
- [ ] WordPress version hidden
- [ ] File editing disabled in wp-config.php

## Step 10: Performance Optimization

- [ ] Object caching configured (Redis/Memcached)
- [ ] GraphQL query caching enabled
- [ ] Database optimized
- [ ] Image optimization configured
- [ ] CDN configured (if applicable)

## Step 11: User Roles & Permissions

- [ ] Administrator role configured
- [ ] Editor role configured
- [ ] Contributor role configured
- [ ] User Role Editor plugin installed (if needed)
- [ ] Permissions tested

## Step 12: Editorial Workflow

- [ ] Draft → Pending Review → Published workflow tested
- [ ] Auto-publish disabled
- [ ] Content review process documented

## Step 13: Testing

- [ ] Create test article with all ACF fields
- [ ] Test REST API: Fetch article via `/wp-json/wp/v2/article`
- [ ] Test GraphQL: Fetch article via GraphQL query
- [ ] Test category filtering
- [ ] Test geography filtering
- [ ] Test sponsored content filtering
- [ ] Test pagination
- [ ] Test search functionality

## Step 14: Next.js Integration

- [ ] WordPress API URL added to Next.js `.env.local`
- [ ] GraphQL endpoint configured in Next.js
- [ ] Test homepage query from Next.js
- [ ] Test article page query from Next.js
- [ ] Test category page query from Next.js
- [ ] Verify images load correctly
- [ ] Verify ACF fields appear in Next.js

## Step 15: Documentation

- [ ] WordPress admin access documented
- [ ] API endpoints documented
- [ ] GraphQL queries documented
- [ ] Content creation workflow documented
- [ ] Troubleshooting guide created

## Post-Installation

- [ ] Regular backup schedule configured
- [ ] Monitoring set up (uptime, errors)
- [ ] Performance monitoring configured
- [ ] Security scanning scheduled
- [ ] Team training completed

---

## Quick Test Commands

### Test REST API
```bash
curl https://yourwordpresssite.com/wp-json/wp/v2/article
```

### Test GraphQL
```bash
curl -X POST https://yourwordpresssite.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ articles { nodes { title } } }"}'
```

### Test ACF Fields in GraphQL
```bash
curl -X POST https://yourwordpresssite.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ articles { nodes { title articleFields { articleType featured } } } }"}'
```

---

## Troubleshooting

**GraphQL endpoint not working?**
- Check WPGraphQL plugin is activated
- Verify GraphQL endpoint is enabled in settings
- Check server error logs

**ACF fields not in GraphQL?**
- Verify WPGraphQL for ACF plugin is installed
- Check ACF field group location rules
- Clear GraphQL cache

**REST API not accessible?**
- Check permalink structure
- Verify post type has `show_in_rest` => true
- Check CORS headers

**Performance issues?**
- Enable object caching
- Enable GraphQL query caching
- Optimize database
- Check server resources
