
<card>
	<h1><?php the_field('name'); ?></h1>
	<picture>
		<img src="<?php the_field('image'); ?>" alt="">
	</picture>
	<p>Years old: <?php the_field('age'); ?></p>

	<a href="<?php the_permalink(); ?>">Read more</a>
</card>
