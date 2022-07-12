<?php

wp_enqueue_style( 'style', get_stylesheet_uri() );

function register_my_menu() {
  register_nav_menu('site-menu',__( 'Site Menu' ));
}
add_action( 'init', 'register_my_menu' );