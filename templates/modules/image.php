<?php  


	$heading = $section["heading"] ?? "";
	$img = $section["img"] ?? "images/research-picture.jpg";
	$caption = $section["caption"] ?? "<p class='calm-voice'>Images sometimes need captions!</p>";
	$description = $section["description"] ?? "<p class='calm-voice'>Images sometimes need descriptions!</p>";
	$second_img = $section["second_img"] ?? "";

?>

<?php if ($page == 'style-guide') { ?>
<inner-column>
<?php } ?>

<generic-text>
	<?php if ($heading) { ?>
		
			<h2 class="attention-voice"><?=$heading?></h2>
		
	<?php } ?>
	
	
		<picture>
			
			<img src="<?=$img?>" alt="">
			
		</picture>


			<?=$description?>

</generic-text>

<?php if ($caption) { ?>
	<?=$caption?>	
<?php } ?>

<?php if ($page == 'style-guide') { ?>
<inner-column>
<?php } ?>
