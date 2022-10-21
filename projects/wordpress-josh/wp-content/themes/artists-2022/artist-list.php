<section class="artist-grid">
<inner-column>

<?php 

	$filter = [  
        'post_type' => 'artists',
    ];

    $artists = new WP_Query( $filter ); 
        
    while ( $artists->have_posts() ) : $artists->the_post(); 
        include('templates/artist.php');
    endwhile;

    wp_reset_postdata(); 

?>

</inner-column>
</section>