<?php
/**
 * Custom Post Types Registration
 * Add this to functions.php or create as a plugin
 */

// Register Article Post Type
function register_article_post_type() {
    $labels = array(
        'name'                  => 'Articles',
        'singular_name'         => 'Article',
        'menu_name'             => 'Articles',
        'add_new'               => 'Add New',
        'add_new_item'          => 'Add New Article',
        'edit_item'             => 'Edit Article',
        'new_item'              => 'New Article',
        'view_item'             => 'View Article',
        'search_items'          => 'Search Articles',
        'not_found'             => 'No articles found',
        'not_found_in_trash'    => 'No articles found in Trash',
    );

    $args = array(
        'labels'                => $labels,
        'public'                => false, // Headless - no public frontend
        'publicly_queryable'    => true,  // Allow REST API access
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_rest'          => true,  // Enable REST API
        'rest_base'             => 'article',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'has_archive'           => false,
        'hierarchical'          => false,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-media-document',
        'supports'              => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', 'revisions'),
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'article',
        'graphql_plural_name'   => 'articles',
    );

    register_post_type('article', $args);
}
add_action('init', 'register_article_post_type');

// Register Founder Interview Post Type
function register_founder_interview_post_type() {
    $labels = array(
        'name'                  => 'Founder Interviews',
        'singular_name'         => 'Founder Interview',
        'menu_name'             => 'Founder Interviews',
    );

    $args = array(
        'labels'                => $labels,
        'public'                => false,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_rest'          => true,
        'rest_base'             => 'founder-interview',
        'has_archive'           => false,
        'supports'              => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'founderInterview',
        'graphql_plural_name'   => 'founderInterviews',
    );

    register_post_type('founder_interview', $args);
}
add_action('init', 'register_founder_interview_post_type');

// Register Sponsored Story Post Type
function register_sponsored_story_post_type() {
    $labels = array(
        'name'                  => 'Sponsored Stories',
        'singular_name'         => 'Sponsored Story',
        'menu_name'             => 'Sponsored Stories',
    );

    $args = array(
        'labels'                => $labels,
        'public'                => false,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_rest'          => true,
        'rest_base'             => 'sponsored-story',
        'has_archive'           => false,
        'supports'              => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'sponsoredStory',
        'graphql_plural_name'   => 'sponsoredStories',
    );

    register_post_type('sponsored_story', $args);
}
add_action('init', 'register_sponsored_story_post_type');

// Register Report Post Type
function register_report_post_type() {
    $labels = array(
        'name'                  => 'Reports',
        'singular_name'         => 'Report',
        'menu_name'             => 'Reports',
    );

    $args = array(
        'labels'                => $labels,
        'public'                => false,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_rest'          => true,
        'rest_base'             => 'report',
        'has_archive'           => false,
        'supports'              => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'report',
        'graphql_plural_name'   => 'reports',
    );

    register_post_type('report', $args);
}
add_action('init', 'register_report_post_type');

// Register Job Post Type
function register_job_post_type() {
    $labels = array(
        'name'                  => 'Jobs',
        'singular_name'         => 'Job',
        'menu_name'             => 'Jobs',
    );

    $args = array(
        'labels'                => $labels,
        'public'                => false,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_rest'          => true,
        'rest_base'             => 'job',
        'has_archive'           => false,
        'supports'              => array('title', 'editor', 'excerpt', 'custom-fields'),
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'job',
        'graphql_plural_name'   => 'jobs',
    );

    register_post_type('job', $args);
}
add_action('init', 'register_job_post_type');
