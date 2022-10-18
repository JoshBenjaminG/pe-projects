

<?php get_header(); ?>

<?php 

	if (is_page('home')) {
		include("home.php");
	}

	if (is_page('list')) {
		 $args = array(  
        'post_type' => 'artists',
    );

    $loop = new WP_Query( $args ); 
        
    while ( $loop->have_posts() ) : $loop->the_post(); 
        include('artist.php'); 
    endwhile;

    wp_reset_postdata(); 

	}

	if (is_singular('artists')) {
		include('detail.php'); 
	}

?>

<?php get_footer(); ?>

