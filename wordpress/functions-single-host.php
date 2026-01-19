<?php
/**
 * Headless WordPress Functions for Single-Host Setup
 * Add this to: wp-content/themes/headless/functions.php
 * Or create a simple plugin
 */

// Redirect frontend to admin (headless mode)
add_action('template_redirect', function() {
    // Allow admin, AJAX, cron, REST API, and GraphQL
    if (is_admin() || 
        wp_doing_ajax() || 
        wp_doing_cron() ||
        strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false ||
        strpos($_SERVER['REQUEST_URI'], '/graphql') !== false) {
        return; // Don't redirect these
    }
    
    // Redirect everything else to admin
    wp_redirect(admin_url());
    exit;
});

// Enable CORS for REST API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
});

// Disable XML-RPC (security)
add_filter('xmlrpc_enabled', '__return_false');

// Remove WordPress version (security)
remove_action('wp_head', 'wp_generator');

// Security headers
add_action('send_headers', function() {
    if (!is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
    }
});

// Disable auto-publish (prevent external publishing)
add_filter('wp_insert_post_data', function($data, $postarr) {
    if ($data['post_status'] === 'publish' && !current_user_can('publish_posts')) {
        $data['post_status'] = 'pending';
    }
    return $data;
}, 10, 2);

// Performance: Disable unnecessary features
add_action('init', function() {
    // Disable emojis
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    
    // Disable embeds
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
});
