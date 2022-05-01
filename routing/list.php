<ul class="list-lecture">
	<?php foreach (getLectures() as $lecture) { ?>
		<li class='lecture'>
			<card>
				<h2><?=$lecture["title"]?></h2>
			</card>
		</li>
	<?php } ?>
</ul>