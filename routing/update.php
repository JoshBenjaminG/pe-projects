<?php 
	$id = $_GET["id"];
	$lecture = getRecordById($id);
	if(isset($_POST['update'])) {
		$data = getDatabase();
	    $data['lectures'][$id]['title'] = $_POST['title'];
	    saveDatabase($data);
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
		
</form>

<a href="?page=create" class="button">List Page</a>
</div>