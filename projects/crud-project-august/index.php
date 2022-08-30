<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>

<?php 

include('functions.php');

$json = file_get_contents("data.json");

$data = json_decode($json, true);

if (isset($_POST["create"])) {
	$newMovie = [
		"title" => $_POST['title'],
	];
	createMovie($newMovie);
}

?>

<form method="POST">
	<div>
		<h1>Add a title</h1>

		<field>
			<label>Name</label>
			<input type="name" name="title">
		</field>

		<button type="submit" name="create">Add</button>
	</div>
		
</form>

<?php foreach (getMovies() as $key => $movies) { ?>
		<p><?=$movies["title"]?></p>
	<?php } ?>


	
</body>
</html>