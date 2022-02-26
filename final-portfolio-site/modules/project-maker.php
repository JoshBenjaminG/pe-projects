<h1 class="intro-voice">Some things I've made</h1>

<ul>

	<?php foreach ($projects as $project) { ?>
		
		<li>
			<div>
				<h2 class="calm-voice"><?= $project["name"] ?></h2>
				<p class="calm-voice"><?= $project["description"] ?></p>
				<a href="">Case Study</a>
			</div>
			<div>
				<picture>
					<img src="<?= $project["img"] ?>">
				</picture>
			</div>
		</li>

	<?php } ?>

</ul>
