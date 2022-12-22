<?php 
 
/**
 * Let's make a link on the admin bar, so that when you click it, it displays a modal which includes basic quick edit functions for the post/page that you're on. This would include ACF Fields primarliy, but also possibly the Main Content and Taxonomies.
 *
 */


// Create Admin Bar Button
function cccac_add_toolbar_items($admin_bar) {

    $options = get_option( 'cccac_api_settings' );
    $quick_edit = $options['cccac_api_show_quick_edit_button_checkbox'];
    if(!is_admin() && $quick_edit) {
            $admin_bar->add_menu( array(
            'id'    => 'quick-edit',
            'title' => 'Quick Edit',
            'href'  => '#cccac_quick_edit_modal',
            'rel'   => 'modal:open',
            'meta'  => array(
                'title' => __('Quick Edit'),
                'rel'   => __('modal:open')            
            ),
        ));
    }
}
add_action('admin_bar_menu', 'cccac_add_toolbar_items', 100);



// Enqueue jQuery Modal Plugin
add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_script( 'cccac-jquery-modal', "https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js", array('jquery'), false );
    wp_enqueue_style( 'cccac-jquery-modal-styles', "https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css", false );
});

// You have to put acf_form_head() in the header, instead of just putting it in the modal. This makes the post save correctly and the return URL work.
add_action('init', function() { acf_form_head(); } );


// Add Modal for Quick Edit
function cccac_add_quick_edit_modal() { ?>
    <?php if(is_user_logged_in()) { ?>
        <style>
            .modal a.close-modal {
                display: none;
            }
            #cccac_quick_edit_modal {
                max-width: 80vw;
                width: 80vw;
                height: 80vh;
                position: absolute;
                top: 5vh;
                left: 10vw;
                overflow: scroll;
                z-index: 10001;
            }
            .jquery-modal.blocker,.jquery-modal.blocker.current {
                z-index: 1000;
            }
            .acf-form-fields, .acf-form-submit {
                margin-bottom: 32px;
            }
            .acf-form-submit input {
                padding: 10px 20px;
                font-size: 16px;
            }
        </style>
        <div id="cccac_quick_edit_modal" class="modal">
            <?php
            get_header(); 
            ?>

            <div id="primary" class="content-area">
                <div id="content" class="site-content" role="main">
                    <?php while ( have_posts() ) : the_post(); ?>
                        <?php acf_form( array(
                             'post_title'     => true,
                             'post_content'   => false,
                             'submit_value'   => __( "Update", 'acf' ),
                             'update_message' => __( "Updated", 'acf' ),
                        )); ?>
                    <?php endwhile; ?>
                </div><!-- #content -->
            </div><!-- #primary -->
        </div>
    <?php }
}
add_action('wp_footer', 'cccac_add_quick_edit_modal'); 

//Custom redirected after creating a post
function custom_redirect_function_name($post_id) {

    if(!is_admin()) {
        $redirect = get_the_permalink($post_id);
        wp_redirect($redirect);
        exit;
    }
}
add_action('acf/save_post', 'custom_redirect_function_name', 20);