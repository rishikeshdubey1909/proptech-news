<?php
/**
 * Custom Taxonomies Registration
 * Add this to functions.php or create as a plugin
 */

// Register Article Category Taxonomy
function register_article_category_taxonomy() {
    $labels = array(
        'name'              => 'Article Categories',
        'singular_name'     => 'Article Category',
        'search_items'      => 'Search Categories',
        'all_items'         => 'All Categories',
        'parent_item'       => 'Parent Category',
        'parent_item_colon' => 'Parent Category:',
        'edit_item'         => 'Edit Category',
        'update_item'       => 'Update Category',
        'add_new_item'      => 'Add New Category',
        'new_item_name'     => 'New Category Name',
        'menu_name'         => 'Categories',
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'article-category'),
        'show_in_rest'      => true,
        'rest_base'         => 'article-category',
        'show_in_graphql'   => true,
        'graphql_single_name' => 'articleCategory',
        'graphql_plural_name' => 'articleCategories',
    );

    register_taxonomy('article_category', array('article', 'founder_interview', 'sponsored_story'), $args);
}
add_action('init', 'register_article_category_taxonomy');

// Register Article Tag Taxonomy
function register_article_tag_taxonomy() {
    $labels = array(
        'name'              => 'Article Tags',
        'singular_name'     => 'Article Tag',
        'search_items'      => 'Search Tags',
        'all_items'         => 'All Tags',
        'edit_item'         => 'Edit Tag',
        'update_item'       => 'Update Tag',
        'add_new_item'      => 'Add New Tag',
        'new_item_name'     => 'New Tag Name',
        'menu_name'         => 'Tags',
    );

    $args = array(
        'hierarchical'      => false,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'article-tag'),
        'show_in_rest'      => true,
        'rest_base'         => 'article-tag',
        'show_in_graphql'   => true,
        'graphql_single_name' => 'articleTag',
        'graphql_plural_name' => 'articleTags',
    );

    register_taxonomy('article_tag', array('article', 'founder_interview', 'sponsored_story', 'report'), $args);
}
add_action('init', 'register_article_tag_taxonomy');

// Register Geography Taxonomy
function register_geography_taxonomy() {
    $labels = array(
        'name'              => 'Geography',
        'singular_name'     => 'Geography',
        'search_items'      => 'Search Geography',
        'all_items'         => 'All Geography',
        'parent_item'       => 'Parent Geography',
        'parent_item_colon' => 'Parent Geography:',
        'edit_item'         => 'Edit Geography',
        'update_item'       => 'Update Geography',
        'add_new_item'      => 'Add New Geography',
        'new_item_name'     => 'New Geography Name',
        'menu_name'         => 'Geography',
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'geography'),
        'show_in_rest'      => true,
        'rest_base'         => 'geography',
        'show_in_graphql'   => true,
        'graphql_single_name' => 'geography',
        'graphql_plural_name' => 'geographies',
    );

    register_taxonomy('geography', array('article', 'founder_interview', 'sponsored_story', 'report'), $args);
}
add_action('init', 'register_geography_taxonomy');

// Create default taxonomy terms on activation
function create_default_taxonomy_terms() {
    // Article Categories
    $categories = array('Startups', 'Funding', 'Insights', 'Policy', 'Global');
    foreach ($categories as $category) {
        if (!term_exists($category, 'article_category')) {
            wp_insert_term($category, 'article_category');
        }
    }

    // Geography
    $geography = array(
        'India' => array('Mumbai', 'Delhi', 'Bangalore'),
        'US' => array('California', 'New York'),
        'UAE' => array(),
        'Global' => array(),
    );
    
    foreach ($geography as $parent => $children) {
        $parent_term = wp_insert_term($parent, 'geography');
        if (!is_wp_error($parent_term) && !empty($children)) {
            $parent_id = $parent_term['term_id'];
            foreach ($children as $child) {
                wp_insert_term($child, 'geography', array('parent' => $parent_id));
            }
        }
    }
}
register_activation_hook(__FILE__, 'create_default_taxonomy_terms');
