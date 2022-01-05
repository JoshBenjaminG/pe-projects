<?php foreach ($students as $student) { ?>
		
	<div class="student <?=$student["name"]?>">
		<picture>
			<img src="<?=$student["picture"]?>">
		</picture>
	  	<h2><?=$student["name"]?></h2>
	  	<p><?=$student["description"]?></p>
	 	<a href=""><?=$student["link"]?></a>
	</div>


<?php } ?>