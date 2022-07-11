<?php get_header(); ?>

<?php 
	if (is_page('home')) {
		echo 'home';
	}

	if (is_page('list')) {
		$args = array(  
		    'post_type' => 'people',
		);

		$loop = new WP_Query( $args ); 
		    
		while ( $loop->have_posts() ) : $loop->the_post(); 
		    include("template/components/people-card.php"); 
		endwhile;

		wp_reset_postdata(); 
	}

	if (is_singular('people')) {
		echo the_field("name");
	}
?>

<?php get_footer(); ?>