<?php

?>

<article class='article-card'>
	<picture>
		<img src='<?=$article["thumbnail"]?>' alt='$todo'>
	</picture>

	<text-content>
		<h1 class='title strong-voice'><?=$article["heading"]?></h1>

		<p class='teaser'><?=$article["description"]?></p>

		<a class='button' href='?page=detail&id=<?=$key?>'>Call to action</a>
	</text-content>
</article>
