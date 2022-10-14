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
        echo "<h1>" . get_the_title() . "</h1>"; 
    endwhile;

    wp_reset_postdata(); 

	}

?>

<?php get_footer(); ?>