<inner-column>
<div>

<?php
echo the_field('name');
$albums = get_field('favorite_albums');
if( $albums ): ?>
    <ul>
    <?php foreach( $albums as $post ): 

        // Setup this post for WP functions (variable must be named $post).
        setup_postdata($post); ?>
        <li>
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            <span><?php the_field( 'album' ); ?></span>
        </li>
    <?php endforeach; ?>
    </ul>
    <?php 
    // Reset the global post object so that the rest of the page works correctly.
    wp_reset_postdata(); ?>
<?php endif; ?>

</div>
</inner-column>