<section>
	<inner-column>
		<?php 

			$args = array(  
			    'post_type' => 'albums',
			);

			$loop = new WP_Query( $args ); 
			    
			while ( $loop->have_posts() ) : $loop->the_post(); 
			    echo the_title() . "<br>";
			endwhile;

			wp_reset_postdata(); 

		?>
	</inner-column>
</section>