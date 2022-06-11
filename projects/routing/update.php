<?php 
	$message = "";
	$id = $_GET["id"];
	$lecture = getRecordById($id);
	if(isset($_POST['update'])) {
		updateRecord($id);
	    $message = 'UPDATED!';
	}
?>

<div class="inner-column">
	<p class="success"><?=$message?></p>
<form method="POST">
	<div>
		<h1>Update</h1>
		<field>
			<label>Update</label>
			<input type="name" name="title" value="<?=$lecture['title']?>">
		</field>
		<button type="submit" name="update">Update</button>
	</div>
	<a href="?page=create" class="button">List Page</a>
</form>


</div>