<?php 

$header = $module["header"];
$content = $module["content"];
$style = $module["type"];
$reviews = $module["reviews"];

?>

<section class="clients">
<inner-column>
	<clients class="<?=$style?>">
		<text-content>
			<h1 class="loud-voice"><?=$header?></h1>
			<p><?=$content?></p>
		</text-content>
		<client-card>
			<?php foreach($reviews as $review) { 
				include('client-card.php');
			 } ?>
		</client-card>
	</clients>
</inner-column>
</section>