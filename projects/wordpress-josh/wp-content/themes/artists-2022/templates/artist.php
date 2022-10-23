
<card>
	<h1><?php the_field('name'); ?></h1>
	<picture class="artist-img">
		<img src="<?php the_field('image'); ?>" alt="">
	</picture>
	<p>Year Formed: <?php the_field('age'); ?></p>

	<a href="<?php the_permalink(); ?>">Read more</a>
</card>
