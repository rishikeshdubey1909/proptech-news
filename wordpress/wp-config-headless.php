<?php
/**
 * Headless WordPress Configuration Additions
 * Add these to your wp-config.php file
 */

// Security: Disable file editing
define('DISALLOW_FILE_EDIT', true);

// Security: Increase security keys
// Generate new keys at: https://api.wordpress.org/secret-key/1.1/salt/

// Performance: Enable object caching (Redis example)
define('WP_REDIS_HOST', '127.0.0.1');
define('WP_REDIS_PORT', 6379);
define('WP_REDIS_DATABASE', 0);

// Performance: Increase memory limit
define('WP_MEMORY_LIMIT', '256M');

// Debugging (disable in production)
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);

// Disable automatic updates (manual control)
define('AUTOMATIC_UPDATER_DISABLED', false); // Set to true for manual updates only

// Allow REST API from any origin (for headless)
define('REST_API_ALLOW_ORIGIN', '*');

// GraphQL settings
define('GRAPHQL_DEBUG', false); // Set to true for development

// Increase upload size if needed
@ini_set('upload_max_size', '64M');
@ini_set('post_max_size', '64M');
@ini_set('max_execution_time', '300');
