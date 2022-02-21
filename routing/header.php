<!DOCTYPE html>

<?php 

if(isset($_GET['page'])) {
	$page = $_GET['page'];
} else {
	$page = 'home';
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
			<a href='?page=home' class="<?php if( $page == 'home') { echo 'active'; } ?>">home page</a>
			<a href='?page=list' class="<?php if( $page == 'list') { echo 'active'; } ?>">lectures page</a>
			<a href='?page=create' class="<?php if( $page == 'create') { echo 'active'; } ?>">add lecture</a>
	</nav>
</header>