
<card>
	<h2><?php echo the_field('name'); ?></h2>
	<picture>
		<img src="<?php echo the_field('image'); ?>" alt="">
	</picture>
	<h2>Years old: <?php echo the_field('age'); ?></h2>

	<a href="<?php the_permalink(); ?>">Read more</a>
</card>
