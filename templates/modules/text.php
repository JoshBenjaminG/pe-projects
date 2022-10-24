<?php 

	$heading = $section["heading"] ?? "This is an example of a case study heading"; 
	$content = $section["content"] ?? "This could be a paragraph for the case study module content.";
	
?>


<?php if ($page == 'style-guide') { ?>
<inner-column>
<?php } ?>
<generic-text>

	<?php if ($heading) { ?>
		<h2 class="attention-voice"><?=$heading?></h2>
	<?php } ?>
	
	<?=$content?>
	
</generic-text>
<?php if ($page == 'style-guide') { ?>
</inner-column>
<?php } ?>

