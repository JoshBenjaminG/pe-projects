<section class="people-list">
	<inner-column>
		<h1>People List</h1>

		<?php 

			$args = array(  
			    'post_type' => 'people',
			);

			$loop = new WP_Query( $args ); 
			    
			while ( $loop->have_posts() ) : $loop->the_post(); 
			    include("people-card.php");
			endwhile;

			wp_reset_postdata(); 

		?>
	</inner-column>
</section>

