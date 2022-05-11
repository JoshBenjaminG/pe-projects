<?php 

	include('functions.php');
	
	$comment = "";

	 if (isset($_POST['create'])) {
	 	$comment = $_POST['comment'];
	 	$newComment = [
	 		"comment" => $comment,
	 	];
	 	createRecord($newComment);
	 }

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Single-page-Crud</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>

	<form method="POST">
	<label>Comment</label>
	<input type="comment" name="comment">
	<button type="submit" name="create">Add</button>
</form>

<ul>
<?php foreach (getComments() as $key => $comments) { ?>
		<li>
			<p><?=$comments["comment"]?></p>
		</li>
	<?php	if (isset($_POST[$key])) { ?>
				<?php deleteRecord($key); ?>
	 <?php } ?>
		<form method="post">
   			<button type="submit" name="<?=$key?>">Delete</button>
		</form>
	<?php } ?>
</ul>

</body>
</html>

