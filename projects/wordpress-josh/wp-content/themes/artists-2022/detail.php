<inner-column>
<div>

<?php
$theName = get_field('name');
$theDescription = get_field('description');
echo "<p>" . $theName . "</p>";
echo "<br>";
echo "<p class='calm-voice'>" . $theDescription . "</p>";
echo "<br>";
$albums = get_field('favorite_albums');
if( $albums ): ?>
    <ul>
    <?php foreach( $albums as $post ): 

        // Setup this post for WP functions (variable must be named $post).
        setup_postdata($post); ?>
        <li>
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
           
        </li>
    <?php endforeach; ?>
    </ul>
    <?php 
    // Reset the global post object so that the rest of the page works correctly.
    wp_reset_postdata(); ?>
<?php endif; ?>

</div>
</inner-column>