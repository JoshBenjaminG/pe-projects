<?php 

$portrait = get_field("portrait");
$name = get_field("name");
$age = get_field("age");

?> 

<people-card>

	<h2><?php the_field("name") ?></h2>

	<picture>
		<img src="<?=$portrait["url"]?>">
	</picture>

	<h3><?php the_field("age") ?></h3>

	<a href="<?php the_permalink(); ?>">Read more</a>
</people-card>