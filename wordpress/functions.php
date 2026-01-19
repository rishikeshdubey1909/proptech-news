<?php
/**
 * Headless WordPress Functions
 * Add this to your theme's functions.php or create a custom plugin
 */

// Disable theme rendering for headless setup
add_action('init', function() {
    if (!is_admin() && !wp_doing_ajax() && !wp_doing_cron()) {
        // Allow REST API and GraphQL
        if (strpos($_SERVER['REQUEST_URI'], '/wp-json/') === false && 
            strpos($_SERVER['REQUEST_URI'], '/graphql') === false) {
            // Redirect non-admin, non-API requests
            wp_redirect(home_url('/wp-admin/'));
            exit;
        }
    }
});

// Enable CORS for REST API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
});

// Disable XML-RPC
add_filter('xmlrpc_enabled', '__return_false');

// Remove WordPress version from head
remove_action('wp_head', 'wp_generator');

// Security headers
add_action('send_headers', function() {
    if (!is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
    }
});

// Expose ACF fields in REST API
add_action('rest_api_init', function() {
    if (function_exists('acf_register_rest_field')) {
        // Register ACF fields for articles
        acf_register_rest_field('article', 'acf_fields', array(
            'get_callback' => function($object) {
                return get_fields($object['id']);
            },
        ));
    }
});

// Customize REST API response
add_filter('rest_prepare_article', function($response, $post) {
    // Add ACF fields to response
    $acf_fields = get_fields($post->ID);
    if ($acf_fields) {
        $response->data['acf'] = $acf_fields;
    }
    return $response;
}, 10, 2);

// Disable auto-publish (prevent external publishing)
add_filter('wp_insert_post_data', function($data, $postarr) {
    // Only allow publish if user has publish_posts capability
    if ($data['post_status'] === 'publish' && !current_user_can('publish_posts')) {
        $data['post_status'] = 'pending';
    }
    return $data;
}, 10, 2);

// Rate limiting for REST API (basic)
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) {
        return $result;
    }
    
    // Basic rate limiting (can be enhanced with transients)
    $ip = $_SERVER['REMOTE_ADDR'];
    $transient_key = 'rest_api_rate_limit_' . md5($ip);
    $requests = get_transient($transient_key);
    
    if ($requests === false) {
        set_transient($transient_key, 1, 60); // 1 minute window
    } elseif ($requests >= 100) {
        return new WP_Error('rate_limit_exceeded', 'Rate limit exceeded', array('status' => 429));
    } else {
        set_transient($transient_key, $requests + 1, 60);
    }
    
    return $result;
});

// Performance: Disable unnecessary features
add_action('init', function() {
    // Disable emojis
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    
    // Disable embeds
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
});
