<?php

	$thumbnail = $project["thumbnail"];
	$url = $project["url"];
	$caseStudy = $project["hasCaseStudy"];
	$hasRepo = $project["hasRepo"];
	$repo = $project["gitrepo"];
	$hasDemo = $project["hasDemo"];
	
?>


<project-card>
		<picture>
			<img src='<?=$thumbnail?>' loading='lazy' alt='$todo'>
		</picture>

		<a href="<?=$url?>" target="_blank"><h2 class='attention-voice project-title'><?=$project['heading']?></h2></a>

		<h3 class='calm-voice tech'><?=$project['technologies']?></h3>

		<p class='calm-voice'><?=$project['description']?></p>

		<div>
		<?php if ($caseStudy == true) { ?>
			<a href='?page=detail&project=<?=$project['slug']?>' target="_blank" class="calm-voice">Read Case Study</a>
		<?php }?>
		<?php if ($hasRepo == true) { ?>
		<a href='<?=$repo?>' target="_blank" class="calm-voice">Github Repo</a>
		<?php } ?>
		<?php if ($hasDemo == true) { ?>
		<a href='<?=$url?>' target="_blank" class="calm-voice">Live Demo</a>
		<?php } ?>
		</div>
</project-card>
