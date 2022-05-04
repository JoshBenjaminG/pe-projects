<?php

if (isset($_GET['deleted'])) {
	$deleted = $_GET['deleted'];
	echo "<p>$deleted was deleted.</p>";
}

?>


<ul class="list-lecture">
	<?php foreach (getLectures() as $key => $lecture) { ?>
		<li class='lecture'>
			<card>
				<h2><?=$lecture["title"]?></h2>
			</card>
				<a href='?page=delete&id=<?=$key?>' type="submit" name="delete" class="button">delete</a>
				<a href='?page=update&id=<?=$key?>' type="submit" name="update" class="button">update</a>
		</li>
	<?php } ?>
</ul>
