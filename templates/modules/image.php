<?php  


	$heading = $section["heading"] ?? "";
	$img = $section["img"] ?? "images/research-picture.jpg";
	$caption = $section["caption"] ?? "<p class='calm-voice'>Images sometimes need captions!</p>";
	$description = $section["description"] ?? "<p class='calm-voice'>Images sometimes need descriptions!</p>";
	$second_img = $section["second_img"] ?? "";
	$variant = $section["variant"] ?? "";

?>

<?php if ($page == 'style-guide') { ?>
<inner-column>
<?php } ?>

<?php if ($heading) { ?>
	<h2 class="attention-voice img-section-heading"><?=$heading?></h2>
<?php } ?>

<picture-row>

	<picture<?php if ($variant) { ?> class="<?=$variant?>"<?php } ?>>

		<img src="<?=$img?>" alt="">

	</picture>

	<?php if ($caption) { ?>
		<?=$caption?>	
	<?php } ?>

</picture-row>

<generic-text>
		<?=$description?>
</generic-text>

<?php if ($page == 'style-guide') { ?>
<inner-column>
<?php } ?>
