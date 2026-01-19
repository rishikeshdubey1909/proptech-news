# Headless WordPress CMS Setup

Complete setup guide for using WordPress as a headless CMS for the PropTech News platform.

## Quick Start

1. **Read the main setup guide**: `HEADLESS_WORDPRESS_SETUP.md`
2. **Follow the installation checklist**: `INSTALLATION_CHECKLIST.md`
3. **Review GraphQL queries**: `graphql-queries.md`

## File Structure

```
wordpress/
├── HEADLESS_WORDPRESS_SETUP.md    # Complete setup guide
├── INSTALLATION_CHECKLIST.md      # Step-by-step checklist
├── graphql-queries.md              # Example GraphQL queries
├── functions.php                   # WordPress functions for headless
├── wp-config-headless.php          # wp-config.php additions
├── custom-post-types.php           # Custom post type registration
├── taxonomies.php                  # Taxonomy registration
├── acf-field-groups.json          # ACF field group definitions
└── README.md                       # This file
```

## Key Features

✅ **Headless-only WordPress** - No frontend theme rendering  
✅ **REST + GraphQL APIs** - Both API options available  
✅ **Custom Post Types** - Articles, Interviews, Reports, Jobs  
✅ **Advanced Custom Fields** - Rich metadata for all content  
✅ **Taxonomies** - Categories, Tags, Geography  
✅ **Security Hardened** - 2FA, rate limiting, security headers  
✅ **Performance Optimized** - Caching, object caching  
✅ **Editorial Workflow** - Draft → Review → Publish  

## Next Steps

1. Install WordPress and required plugins
2. Add code from `functions.php` to your theme
3. Add configuration from `wp-config-headless.php` to `wp-config.php`
4. Register custom post types and taxonomies
5. Create ACF field groups
6. Configure WPGraphQL
7. Test GraphQL queries
8. Connect Next.js frontend

## Support

- **WPGraphQL Docs**: https://www.wpgraphql.com/docs/
- **ACF Docs**: https://www.advancedcustomfields.com/resources/
- **WordPress REST API**: https://developer.wordpress.org/rest-api/
