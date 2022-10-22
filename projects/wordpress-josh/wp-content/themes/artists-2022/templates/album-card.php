<card>
	<h2><?php echo the_title(); ?></h2>
	<picture>
		<img src="<?php echo the_field('album_image'); ?>" alt="">
	</picture>
	<h2>Release Date: <?php echo the_field('release_date'); ?></h2>
	<h2>Album Length: <?php echo the_field('length'); ?></h2>
<?php

// Check rows existexists.
if( have_rows('track') ):

    // Loop through rows.
    while( have_rows('track') ) : the_row();

        // Load sub field value.
        $sub_value = get_sub_field('title');
        $sub_length = get_sub_field('length');
        echo "<p class='calm-voice'>" . $sub_value . ": " . $sub_length . "</p>";
        echo "<br>";

    // End loop.
    endwhile;

// No value.
else :
    // Do something...
endif;
?>
</card>