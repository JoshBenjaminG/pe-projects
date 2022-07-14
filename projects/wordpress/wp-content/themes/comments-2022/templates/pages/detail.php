<?php
$album = get_field('favorite_album');
$portrait = get_field("portrait");
$name = get_field("name");
$age = get_field("age");

if( $album ): ?>
    <div><?=$name?>'s page.</div>
    <label>Age: </label> <?=$age?>
    <picture>
        <img src="<?=$portrait["url"]?>">
    </picture>
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