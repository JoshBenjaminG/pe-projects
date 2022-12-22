<?php
/**
* Plugin Name: Admin Functionality
* Plugin URI: https://www.classiccity.com.com/
* Description: A plugin to add WP-ADMIN Customizations
* Version: 1
* Author: Classic City Consulting
* Author URI: http://www.classiccity.com/
**/

include('public/admin-bar-quick-edit-post.php');
include('public/simple-hide-admin-bar.php');
include('public/marker-io-integration.php');
include('admin/admin-settings-page.php');



// Add a link to the settings page on the Plugins Page
function cccac_plugin_page_link( $links ) {
    // Build and escape the URL.
    $url = esc_url( add_query_arg(
        'page',
        'ccc-admin-customizations',
        get_admin_url() . 'admin.php'
    ) );
    // Create the link.
    $settings_link = "<a href='$url'>" . __( 'Settings' ) . '</a>';
    // Adds the link to the end of the array.
    array_push(
        $links,
        $settings_link
    );
    return $links;
}//end nc_settings_link()
add_filter( 'plugin_action_links_ccc-admin-customizations/ccc-admin-customizations.php', 'cccac_plugin_page_link' );