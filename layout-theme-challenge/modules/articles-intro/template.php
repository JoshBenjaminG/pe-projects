
<?php

include("functions.php");

$body = "";
if ($_GET['mode'] == "dark") {
	$body = "dark";
}



?>

<articles-intro>
	<header class="<?=$body?>">
		<h2 class='attention-voice'>A Collection of Unforgettable Experiences</h2>

		<p>Something for everyone in a resort beyond your dreams. Plush interior design, perfect panoramas of the sea, and pure vistas of forest and rivers.</p>
	</header>

	<article-grid>
		<ul class='article-list'>

			<?php foreach (getArticles() as $key => $article) { ?>
				<li class='article'>
					<?php include('modules/article-card/template.php'); 
					?>

				</li>	
			<?php } ?>

		</ul>
	</article-grid>
</articles-intro>
