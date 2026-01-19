<?php
/**
 * WordPress Configuration for Single-Host Setup
 * Copy this to wp-config.php and fill in your values
 */

// Database settings
define('DB_NAME', 'wordpress_db');
define('DB_USER', 'wp_user');
define('DB_PASSWORD', 'your_strong_password_here');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// Security keys (generate at https://api.wordpress.org/secret-key/1.1/salt/)
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

// WordPress settings
$table_prefix = 'wp_';

// Headless configuration
define('WP_USE_THEMES', false); // Disable theme rendering for headless

// Site URLs (adjust to your setup)
define('WP_HOME', 'https://yourbrand.com/cms');
define('WP_SITEURL', 'https://yourbrand.com/cms');

// Security
define('DISALLOW_FILE_EDIT', true); // Disable file editing in admin
define('FORCE_SSL_ADMIN', true); // Force SSL for admin (if HTTPS available)

// Performance
define('WP_MEMORY_LIMIT', '256M');
define('WP_MAX_MEMORY_LIMIT', '512M');

// Debugging (disable in production)
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);

// REST API CORS (for headless)
define('REST_API_ALLOW_ORIGIN', '*');

// That's all, stop editing! Happy publishing.
require_once ABSPATH . 'wp-settings.php';
