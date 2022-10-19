<inner-column>

<?php 

	$args = array(  
        'post_type' => 'artists',
    );

    $loop = new WP_Query( $args ); 
        
    while ( $loop->have_posts() ) : $loop->the_post(); 
        include('artist.php');
    endwhile;

    wp_reset_postdata(); 

?>

</inner-column>