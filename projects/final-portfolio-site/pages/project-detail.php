<?php 
	// check if the info exists
 	$projectSlug = $_GET['project'];
 		
 	$project = getResourceBySlug('projects', $projectSlug);

 ?>

<h1><?=$project["name"]?></h1>
<p><?=$project["description"]?></p>
<picture>
	<img src="<?=$project["img"]?>">
</picture>