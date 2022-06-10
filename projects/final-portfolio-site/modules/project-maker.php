<?php 

	$projects = getResourceData("projects");

 ?>

<h1 class="intro-voice">Some things I've made</h1>

<ul>

	<?php foreach ($projects as $project) { 


		$slug = $project["slug"];
		$name = $project["name"];
		$description = $project["description"];
		

		?>
		
		<li>
			<div>
				<h2 class="calm-voice"><?=$name?></h2>
				<p class="calm-voice"><?=$description?></p>
				<a href="?page=projectDetail&project=<?=$slug?>">Case Study</a>
			</div>
			<div>
				<picture>
					<img src="<?= $project["img"] ?>">
				</picture>
			</div>
		</li>

	<?php } ?>

</ul>
