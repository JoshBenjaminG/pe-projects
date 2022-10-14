<?php get_header(); ?>

<?php 

	if (is_page('home')) {
		echo "<h1>Home page</h1>";
	}

	if (is_page('list')) {
		 $args = array(  
        'post_type' => 'monsters',
    );

    $loop = new WP_Query( $args ); 
        
    while ( $loop->have_posts() ) : $loop->the_post(); 
        include('monster-card.php'); 
    endwhile;

    wp_reset_postdata(); 

	}

	if (is_singular('monsters')) {
		echo "<h2>" . the_field('name') . "</h2>";
	}

?>

<?php get_footer(); ?>