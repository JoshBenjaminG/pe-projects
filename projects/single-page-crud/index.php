<?php 

	include('functions.php');
	include('comments.JSON');
	
	$comment = "";
	$key = "";

	if (isset($_POST['create'])) {
	 	$comment = $_POST['comment'];
	 	$newComment = [
	 		"comment" => $comment,
	 	];
	 	createRecord($newComment);
	}

	 if (isset($_GET["delete"])) { 
		deleteRecord($_GET["delete"]);
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
			<a href="?delete=<?=$key?>">Delete</a>
		</li>	

	<?php } ?>
</ul>

</body>
</html>

