
<card>
	<h2><?php the_field('name'); ?></h2>
	<picture>
		<img src="<?php the_field('image'); ?>" alt="">
	</picture>
	<h2>Years old: <?php the_field('age'); ?></h2>

	<a href="<?php the_permalink(); ?>">Read more</a>
</card>
