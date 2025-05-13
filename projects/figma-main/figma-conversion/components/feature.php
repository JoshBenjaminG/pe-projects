<?php 

$header = $module["header"];
$content = $module["content"];
$style = $module["type"];
$articles = $module["articles"];

?>

<section class="feature">
<inner-column>
	<feature class="<?=$style?>">
		<div>
			<text-content class="feature-content"> 
				<h1 class="loud-voice"><?=$header?></h1>
				<p><?=$content?></p>
			</text-content>
			<?php if (isset($module["img"])) { ?>
			<picture>
				<img src="<?=$module["img"]?>" alt="">
			</picture>
		<?php } ?>
		</div>
		<article-grid>
			<?php foreach($articles as $article) { ?>
					<article>
					<?php if (isset($article["number"])) { ?>
						<div class="circle"><p><?=$article["number"]?></p></div>
					<?php } ?>

					<?php if (isset($article["icon"])) { ?>
						<picture class="feature-icon">
							<img src="<?=$article["icon"]?>" alt="">
						</picture>
					<?php } ?>
					
						<text-content>
							<h3 class="medium-voice"><?=$article["title"]?></h3>
							<p><?=$article["content"]?></p>
						</text-content>
					</article>
			<?php } ?>	
		</article-grid>
	</feature>
</inner-column>
</section>