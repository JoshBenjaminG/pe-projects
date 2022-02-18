<?php include('lecture-data.php'); ?>

<ul>
	<?php foreach ($lecture_data as $lecture) { ?>
		<li class='lecture'>
			<card>
				<h2><?=$lecture["title"]?></h2>
				<h3><?=$lecture["length"]?></h3>
				<a href= '?page=details&lecture=<?=$lecture["id"]?>'>details</a>
			</card>
		</li>
	<?php } ?>

</ul>

