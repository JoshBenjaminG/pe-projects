<ul>

	<?php foreach ($projects as $project) { ?>
		
		<li>
			<h2 class="calm-voice"><?= $project["name"] ?></h2>
			<p class="calm-voice"><?= $project["description"] ?></p>
			<picture>
				<img src="<?= $project["img"] ?>">
			</picture>
		</li>

	<?php } ?>

</ul>
