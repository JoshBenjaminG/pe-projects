<people-card>
	<h2><?php the_field("name") ?></h2>
	<h3><?php the_field("age") ?></h3>

	<a href="<?php the_permalink(); ?>">Read more</a>
</people-card>