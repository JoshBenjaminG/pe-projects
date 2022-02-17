<!DOCTYPE html>

<?php 

if(isset($_GET['page'])) {
	$page = $_GET['page'];
} else {
	$page = 'empty';
}

?>

<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Routing</title>
	<link rel="stylesheet" href="css/style.css">

</head>
<body>

<main>

<header>
	<nav>
		<a href='?page=home'>home page</a>
		<a href='?page=list'>lectures page</a>
	</nav>
</header>