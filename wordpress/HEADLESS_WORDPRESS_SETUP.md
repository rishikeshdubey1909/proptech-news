# Headless WordPress CMS Setup Guide

## Overview
This guide sets up WordPress as a headless CMS for the PropTech News platform. WordPress will serve only as a content management system with no frontend rendering.

## Architecture

```
WordPress (Headless CMS)
  ├── REST API (wp-json/wp/v2)
  ├── GraphQL API (WPGraphQL)
  └── Admin Dashboard (wp-admin)
         ↓
    Next.js Frontend
```

---

## 1. WordPress Installation & Initial Setup

### Installation Options

**Option A: Self-Hosted (Recommended for Production)**
- Install WordPress 6.4+ on your server
- Use PHP 8.1+ and MySQL 8.0+
- Recommended hosting: WP Engine, Kinsta, or DigitalOcean

**Option B: Local Development**
- Use Local by Flywheel, MAMP, or Docker
- For Docker: `docker-compose up` with WordPress image

### Initial Configuration

1. **Install WordPress** (standard installation)
2. **Set permalink structure** to "Post name" (Settings → Permalinks)
3. **Disable comments** (Settings → Discussion → uncheck "Allow people to submit comments")

---

## 2. Required Plugins

### Core Plugins (Required)

1. **WPGraphQL** (v1.15+)
   - GraphQL API for WordPress
   - Download: https://wordpress.org/plugins/wp-graphql/

2. **Advanced Custom Fields (ACF)** (v6.2+)
   - Custom field management
   - Download: https://www.advancedcustomfields.com/

3. **WPGraphQL for Advanced Custom Fields**
   - Exposes ACF fields to GraphQL
   - Download: https://wordpress.org/plugins/wp-graphql-acf/

4. **Custom Post Type UI**
   - Easy custom post type creation
   - Download: https://wordpress.org/plugins/custom-post-type-ui/

### Security & Performance Plugins

5. **Wordfence Security** (or similar)
   - Firewall, malware scanning, 2FA
   - Download: https://wordpress.org/plugins/wordfence/

6. **WP Rocket** (or W3 Total Cache)
   - Object caching, performance optimization
   - Download: https://wp-rocket.me/

7. **Disable XML-RPC**
   - Security hardening
   - Download: https://wordpress.org/plugins/disable-xml-rpc/

### Optional but Recommended

8. **User Role Editor**
   - Fine-grained permission control
   - Download: https://wordpress.org/plugins/user-role-editor/

9. **WP GraphQL Smart Cache**
   - GraphQL query caching
   - Download: https://wordpress.org/plugins/wp-graphql-smart-cache/

---

## 3. WordPress Configuration for Headless

### Disable Frontend Theme Rendering

Add to `wp-config.php`:

```php
// Disable theme rendering for headless setup
define('WP_USE_THEMES', false);

// Allow REST API from any origin (for Next.js)
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
});
```

### Disable XML-RPC

Add to `wp-config.php`:

```php
// Disable XML-RPC
add_filter('xmlrpc_enabled', '__return_false');
```

### Security Headers

Add to `wp-config.php` or `.htaccess`:

```php
// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
```

---

## 4. Custom Post Types

### Articles (Primary Content Type)

**Post Type Slug:** `article`

**Supports:**
- Title
- Editor (content)
- Excerpt
- Thumbnail (featured image)
- Custom Fields
- Revisions

**Public:** No (headless, no frontend)
**Show in REST API:** Yes
**Show in GraphQL:** Yes

### Founder Interviews

**Post Type Slug:** `founder_interview`

**Supports:**
- Title
- Editor
- Excerpt
- Thumbnail
- Custom Fields

### Sponsored Stories

**Post Type Slug:** `sponsored_story`

**Supports:**
- Title
- Editor
- Excerpt
- Thumbnail
- Custom Fields

### Reports

**Post Type Slug:** `report`

**Supports:**
- Title
- Editor
- Excerpt
- Thumbnail
- Custom Fields

### Jobs

**Post Type Slug:** `job`

**Supports:**
- Title
- Editor
- Excerpt
- Custom Fields

---

## 5. Taxonomies

### Categories (Hierarchical)

**Taxonomy Slug:** `article_category`

**Terms:**
- Startups
- Funding
- Insights
- Policy
- Global

**Attached to:** `article`, `founder_interview`, `sponsored_story`

### Tags (Non-hierarchical)

**Taxonomy Slug:** `article_tag`

**Example Terms:**
- AI
- SaaS
- ESG
- Tokenization
- PropTech
- Real Estate
- FinTech
- IoT

**Attached to:** `article`, `founder_interview`, `sponsored_story`, `report`

### Geography (Hierarchical)

**Taxonomy Slug:** `geography`

**Terms:**
- India
  - Mumbai
  - Delhi
  - Bangalore
- US
  - California
  - New York
- UAE
- Global

**Attached to:** `article`, `founder_interview`, `sponsored_story`, `report`

---

## 6. Advanced Custom Fields (ACF) Setup

### Field Group: Article Metadata

**Location Rules:** Post Type is equal to `article`

**Fields:**

1. **Article Type** (Select)
   - Field Name: `article_type`
   - Choices:
     - `news` → News
     - `analysis` → Analysis
     - `sponsored` → Sponsored
   - Default: `news`

2. **Short Summary** (Textarea)
   - Field Name: `short_summary`
   - Instructions: 150-200 characters for listings and SEO
   - Character Limit: 200

3. **Source Attribution** (Group)
   - Field Name: `source_attribution`
   - Sub Fields:
     - `source_url` (URL)
     - `source_publisher` (Text)

4. **Geography** (Taxonomy)
   - Field Name: `geography`
   - Taxonomy: `geography`
   - Field Type: Taxonomy Select

5. **Company/Startup Names** (Repeater)
   - Field Name: `companies`
   - Sub Fields:
     - `company_name` (Text)
     - `company_url` (URL)

6. **Featured Flag** (True/False)
   - Field Name: `featured`
   - Default: No

7. **Read Time** (Number)
   - Field Name: `read_time`
   - Instructions: Estimated reading time in minutes
   - Default: 5

8. **CTA Type** (Select)
   - Field Name: `cta_type`
   - Choices:
     - `newsletter` → Newsletter Signup
     - `feature_startup` → Feature Your Startup
     - `none` → None
   - Default: `newsletter`

9. **Sponsored Disclosure** (True/False)
   - Field Name: `sponsored_disclosure`
   - Instructions: Show sponsored content disclosure
   - Default: No

### Field Group: Founder Interview Metadata

**Location Rules:** Post Type is equal to `founder_interview`

**Fields:**

1. **Founder Name** (Text)
2. **Company Name** (Text)
3. **Founder Photo** (Image)
4. **LinkedIn URL** (URL)
5. **Twitter Handle** (Text)

### Field Group: Sponsored Story Metadata

**Location Rules:** Post Type is equal to `sponsored_story`

**Fields:**

1. **Sponsor Name** (Text)
2. **Sponsor Logo** (Image)
3. **Sponsor URL** (URL)
4. **Disclosure Text** (Textarea)

### Field Group: Report Metadata

**Location Rules:** Post Type is equal to `report`

**Fields:**

1. **Report Type** (Select)
   - Quarterly Funding Report
   - Market Analysis
   - Industry Trends
2. **Report PDF** (File)
3. **Report Date** (Date Picker)
4. **Key Findings** (Textarea)

### Field Group: Job Metadata

**Location Rules:** Post Type is equal to `job`

**Fields:**

1. **Company Name** (Text)
2. **Job Type** (Select)
   - Full-Time
   - Part-Time
   - Contract
   - Internship
3. **Location** (Text)
4. **Application URL** (URL)
5. **Salary Range** (Text)
6. **Remote** (True/False)

---

## 7. WPGraphQL Configuration

### Enable GraphQL Endpoint

After installing WPGraphQL, the endpoint will be:
```
https://yourwordpresssite.com/graphql
```

### GraphQL Settings

1. Go to **GraphQL → Settings**
2. Enable **GraphQL Endpoint**: Yes
3. Enable **GraphiQL IDE**: Yes (for development)
4. **GraphQL Query Depth Limit**: 10
5. **GraphQL Query Complexity Limit**: 1000

### Expose Custom Post Types to GraphQL

1. Go to **CPT UI → Edit Post Types**
2. For each custom post type, check:
   - ✅ Show in REST API
   - ✅ Show in GraphQL

### Expose ACF Fields to GraphQL

1. Install **WPGraphQL for Advanced Custom Fields**
2. ACF fields will automatically appear in GraphQL schema
3. Field names will be converted to camelCase (e.g., `article_type` → `articleType`)

---

## 8. User Roles & Editorial Workflow

### User Roles

1. **Administrator**
   - Full access to all content and settings

2. **Editor**
   - Can publish, edit, and delete all content
   - Cannot modify settings or plugins

3. **Contributor**
   - Can create and edit their own content
   - Cannot publish (requires Editor/Admin approval)

### Editorial Workflow

1. **Draft** → Contributor creates content
2. **Pending Review** → Submitted for Editor review
3. **Published** → Editor/Admin publishes

**No Auto-Publish:**
- Disable auto-publish from any external sources
- All content requires manual review

---

## 9. Security Hardening

### Essential Security Measures

1. **Two-Factor Authentication (2FA)**
   - Install Wordfence Security
   - Enable 2FA for all admin/editor accounts

2. **Disable XML-RPC**
   - Already configured in wp-config.php

3. **Restrict REST API**
   - Only expose necessary endpoints
   - Use authentication for write operations

4. **Rate Limiting**
   - Configure in Wordfence or use a plugin
   - Limit: 100 requests per minute per IP

5. **Hide WordPress Version**
   ```php
   // In functions.php
   remove_action('wp_head', 'wp_generator');
   ```

6. **Strong Passwords**
   - Enforce strong passwords for all users
   - Use Wordfence password requirements

7. **Regular Updates**
   - Keep WordPress core, plugins, and themes updated
   - Enable automatic security updates

---

## 10. Performance Optimization

### Caching Strategy

1. **Object Caching**
   - Use Redis or Memcached
   - Configure in wp-config.php:
   ```php
   define('WP_REDIS_HOST', '127.0.0.1');
   define('WP_REDIS_PORT', 6379);
   ```

2. **GraphQL Query Caching**
   - Install WP GraphQL Smart Cache
   - Cache duration: 1 hour for public queries

3. **Database Optimization**
   - Regular database cleanup
   - Use WP-Optimize plugin

### Performance Plugins

- **WP Rocket** (premium) or **W3 Total Cache** (free)
- **WP GraphQL Smart Cache**
- **Query Monitor** (for debugging)

---

## 11. Next Steps

1. Install WordPress and required plugins
2. Configure custom post types and taxonomies
3. Set up ACF field groups
4. Configure WPGraphQL
5. Test GraphQL queries (see examples below)
6. Set up security measures
7. Configure caching
8. Connect Next.js frontend

---

## 12. Testing Your Setup

### Test REST API
```
GET https://yourwordpresssite.com/wp-json/wp/v2/article
```

### Test GraphQL
```
POST https://yourwordpresssite.com/graphql
Content-Type: application/json

{
  "query": "{ posts { nodes { title } } }"
}
```

---

## Support & Resources

- **WPGraphQL Docs**: https://www.wpgraphql.com/docs/
- **ACF Docs**: https://www.advancedcustomfields.com/resources/
- **WordPress REST API**: https://developer.wordpress.org/rest-api/
