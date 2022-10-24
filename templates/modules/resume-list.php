<?php 

$header = $module["header"];
$sections = $module["sections"];


?>

<section class="resume-list">
	<inner-column>
		<generic-text>
			<h1 class="attention-voice"><?=$header?></h1>
		</generic-text>

	

		<?php foreach($sections as $section) { ?>
			<resume-grid>
	 		<section class="resume">
				<?=$section["header"]?>

				<ul>
					<?=$section['content']?>
				</ul>
			</section>
			</resume-grid>
		<?php } ?>	
</inner-column>

</section>