<?php
$album = get_field('favorite_album');
if( $album ): ?>
    <div><?php the_field("name"); ?>'s page.</div>
    <ul>
    <?php foreach( $album as $post ): 

        // Setup this post for WP functions (variable must be named $post).
        setup_postdata($post); ?>
   
        <div>Favorite Albums</div>
        <br>
        <li>
            <?php the_title(); ?>
        </li>
    <?php endforeach; ?>
    </ul>
    <?php 
    // Reset the global post object so that the rest of the page works correctly.
    wp_reset_postdata(); ?>
<?php endif; ?>