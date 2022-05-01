<!DOCTYPE html>

<?php 

if(isset($_GET['page'])) {
	$page = $_GET['page'];
} else {
	$page = 'home';
}

//declare a function and pass in ? 

//check if $page is equal to ?

//if so, echo 'active';



function isActive($activePage) {
	$currentPage = $_GET['page'];
	if ( $currentPage == $activePage) {
		echo 'active';
	}
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

<!-- <header>
	<nav>
			<a href='?page=home' class=" <?php isActive('home') ?> ">home page</a>
			<a href='?page=list' class=" <?php isActive('list') ?> ">lectures page</a>
			<a href='?page=create' class=" <?php isActive('create') ?> ">add lecture</a>
	</nav>
</header> -->