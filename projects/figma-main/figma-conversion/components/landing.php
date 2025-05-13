<?php 

$actions = $module["actions"];
$header = $module["header"];
$content = $module["content"];
$style = $module["type"];

?>

<section class="<?=$style?>">
<inner-column>
	<landing>
		<text-content>
			<h1 class="announce-voice"><?=$header?></h1>
			<p><?=$content?></p>
		</text-content>
		<div>
			<?php foreach($actions as $action) { ?>
					<button href="" class="<?=$action["link_class"]?>"><?=$action["link"]?></button>
			<?php } ?>
		</div>
	</landing>
</inner-column>
</section>