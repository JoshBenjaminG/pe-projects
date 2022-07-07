<?php get_header(); ?>

<?php 
	if (is_page('home')) {
		echo 'home';
	}

	if (is_page('list')) {
		$args = array(  
	        'post_type' => 'comments',
    	);

	    $loop = new WP_Query( $args ); 
	        
	    while ( $loop->have_posts() ) : $loop->the_post(); 
	        echo '</p>' . the_title() . "</p>"; 
	    endwhile;

	    wp_reset_postdata(); 
	}
?>

<?php get_footer(); ?>