<card>
	<h2><?php echo the_title(); ?></h2>
	<picture>
		<img src="<?php echo the_field('album_image'); ?>" alt="">
	</picture>
	<h2>Release Date: <?php echo the_field('release_date'); ?></h2>
	<h2>Album Length: <?php echo the_field('length'); ?></h2>
</card>