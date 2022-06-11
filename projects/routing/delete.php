<?php 
	$lecture = getRecordById($_GET["id"]);
	deleteRecord($_GET["id"]);
?>

<div class="inner-column">
<p><?=$lecture["title"]?> was deleted</p>

<a href="?page=create&deleted=<?=$lecture["title"]?>" class="button">List Page</a>
</div>