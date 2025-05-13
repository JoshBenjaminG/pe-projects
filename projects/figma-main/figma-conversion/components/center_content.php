<?php 

$header = $module["header"];
$content = $module["content"];
$preHeader = $module["preheader"];

?>

<section class="center-content">
<inner-column>
	<center-content>
		<?php if (isset($module["icon"])) { ?>
			<picture class="icon">
				<img src="<?=$module["icon"]?>" alt="">
			</picture>
		<?php } ?>
		<text-content>
			<p><?=$preHeader?></p>
			<h1 class="loud-voice"><?=$header?></h1>
			<p><?=$content?></p>
		</text-content>
		<?php if (isset($module["img"])) { ?>
		<picture>
			<img src="<?=$module["img"]?>" alt="">
		</picture>
		<?php } ?>
		<?php if (isset($module["linkText"])) { ?>
			<a href="<?=$module["linkValue"]?>"><?=$module["linkText"]?></a>
		<?php } ?>
	</center-content>
</inner-column>
</section>