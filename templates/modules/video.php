<?php  
	$heading = $section["heading"] ?? "";
	$img = $section["img"] ?? "images/research-picture.jpg";
	$video = $section["video"] ?? ""; // Externalized video ID
	$caption = $section["caption"] ?? "<p class='calm-voice'>Images sometimes need captions!</p>";
	$description = $section["description"] ?? "<p class='calm-voice'>Images sometimes need descriptions!</p>";
	$second_img = $section["second_img"] ?? "";
?>

<?php if ($page == 'style-guide') { ?>
<inner-column>
<?php } ?>

<iframe width="560" height="315" src="<?=$video?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


<?php if ($page == 'style-guide') { ?>
</inner-column>
<?php } ?>
