<?php 

$details = $module["details"];
$header = $module["header"];
$content = $module["content"];
$style = $module["type"];

?>

<section class="FAQ">
<inner-column>
	<faq class="<?=$style?>">
		<text-content>
			<h1 class="loud-voice"><?=$header?></h1>
			<p><?=$content?></p>
		</text-content>
		<div>
			<?php foreach($details as $detail) { ?>
				<details>
				    <summary class="calm-voice"><?=$detail["summary"]?></summary>
				    <p class="calm-voice"><?=$detail["content"]?></p>
				</details>
			<?php } ?>
		</div>
	</faq>
</inner-column>
</section>