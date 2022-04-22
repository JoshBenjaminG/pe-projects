<ul>
	<?php foreach (getLectures() as $lecture) { ?>
		<li class='lecture'>
			<card>
				<h2><?=$lecture["title"]?></h2>
				<h3><?=$lecture["length"]?></h3>
				<h3><?=$lecture["description"]?></h3>
			</card>
		</li>
	<?php } ?>
</ul>