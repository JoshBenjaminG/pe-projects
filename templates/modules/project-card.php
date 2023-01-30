<?php
	// you could simplify the $variables up here if you want....
	// example
	$thumbnail = $project["thumbnail"];
	$url = $project["url"];
	$caseStudy = $project["hasCaseStudy"];
	$hasRepo = $project["hasRepo"];
	$repo = $project["gitrepo"];
	
	// it may or may not - be more readableloud

?>


<project-card>
		<picture>
			<img src='<?=$thumbnail?>' loading='lazy' alt='$todo'>
		</picture>

		<h2 class='attention-voice project-title'><?=$project['heading']?></h2>

		<h3 class='calm-voice tech'><?=$project['technologies']?></h3>

		<p class='calm-voice'><?=$project['description']?></p>

		<div>
		<?php if ($caseStudy == true) { ?>
			<a href='?page=detail&project=<?=$project['slug']?>' target="_blank" class="calm-voice">Read Case Study</a>
		<?php }?>
		<?php if ($hasRepo == true) { ?>
		<a href='<?=$repo?>' target="_blank" class="calm-voice">Github Repo</a>
		<?php } ?>
		<a href='<?=$url?>' target="_blank" class="calm-voice">Live Demo</a>
		</div>
</project-card>
