
<?php
	// you could simplify the $variables up here if you want....
	// example
	$thumbnail = $article["thumbnail"];
	// it may or may not - be more readable
?>


<article-card>

	<picture>
		<img src='<?=$thumbnail?>' loading='lazy' alt='$todo'>
	</picture>

	<h2 class='attention-voice black-text'><?=$article["heading"]?></h2>

	<p class='calm-voice black-text'><?=$article["description"]?></p>

	<a class='link calm-voice' href='#'>
		<span>Read more</span>
	</a>

</article-card>
