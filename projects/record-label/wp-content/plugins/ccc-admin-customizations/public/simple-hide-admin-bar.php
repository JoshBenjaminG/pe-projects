<?php

/**
 * Let's hide the black Admin Bar, and add custom buttons to a corner of the page, for accessing WP-ADMIN, EDIT POST, CUSTOMIZER, and our QUICK EDIT ACF FORM
 *
 */

$options = get_option( 'cccac_api_settings' );
$toggle = $options['cccac_api_hide_admin_toggle'];


// Hide Admin Bar
function ccc_hide_admin_bar(){ return false; }
if($toggle) { add_filter( 'show_admin_bar', 'ccc_hide_admin_bar' ); }

//Determine the Post Type of whatever Post you're on right now
    $post_type = get_post_type();


// Add Admin Buttons (these are out of the way)
function ccc_admin_buttons() { global $post;

    global $wp;
    $post_type = get_post_type();
    $customize_link = "/wp-admin/customize.php?url=";
    $current_url = home_url( add_query_arg( NULL, NULL ) );
    $current_url_encoded = urlencode($current_url);

    //Determine which option has been selected
    $options = get_option( 'cccac_api_settings' );
    $locations = $options['cccac_api_admin_buttons_location_select'];
    $show_customize_button = $options['cccac_api_show_customize_button_checkbox'];
    $toggle = $options['cccac_api_hide_admin_toggle'];
    $quick_edit = $options['cccac_api_show_quick_edit_button_checkbox'];


    if ( $toggle == true && ! is_admin() && (!is_customize_preview())) {
        if(current_user_can('administrator') && !isset($_GET['hide_admin_buttons'])) { ?>
            <div class="ccc-admin-buttons" style="z-index:999999; position:fixed; <?php        
                    switch ($locations) {
                        case "1":
                            echo "top: 30px; left: 20px;";
                            break;
                        case "2":
                            echo "top: 30px; right: 20px;";
                            break;
                        case "3":
                            echo "bottom: 30px; left: 20px;";
                            break;
                        default:
                            echo "bottom: 30px; right: 20px;";
                    }
                    ?>">
                <a href="/wp-admin" class="ccc-admin-button" style="background-color:#007AFF; color:#ffffff; padding: 8px;">Admin</a>
                <a href="<?=get_edit_post_link( $post->ID )?>" class="ccc-admin-button" style="background-color:#007AFF; color:#ffffff; padding: 8px;">Edit <?php echo ucwords($post_type)?></a>
                <?php if($quick_edit) { ?>
                    <a href="#cccac_quick_edit_modal" rel="modal:open" class="ccc-admin-button" style="background-color:#007AFF; color:#ffffff; padding: 8px;">Quick Edit</a>
                <?php } ?>
                <?php if($show_customize_button == "1") { ?>
                    <a href="<?= get_site_url(), $customize_link, $current_url_encoded ?>" class="ccc-admin-button" style="background-color:#007AFF; color:#ffffff; padding: 8px;">Customize</a>
                <? } ?>
            </div>
    <?php  } 
    } 
} 


add_action( 'wp_footer', 'ccc_admin_buttons' );