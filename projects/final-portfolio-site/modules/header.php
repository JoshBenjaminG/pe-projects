<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Joshua Gage</title>
	<link rel='stylesheet' href='css/style.css'>
	<meta property="og:image" content="https://i.imgur.com/JrPzMm4.png">
	<meta property="og:description" content="Joshua Gage - Front end web developer">
</head>

<?php 

	$theme = '';
	if (isset($_GET['theme'])) {
		$theme = $_GET['theme'];
	}

?> 

<body class=" <?=$theme?> ">

<section >

	<header>

		<nav>
			<a href="?" class="logo">
					<?php include('logosvg.php') ?>
			</a>
			<div>
				<a href="?#aboutme">About Me</a>
				<a href="?#projects">Projects</a>
				<a href="?page=resume">Resume</a>
				<a href="?page=goals">Goals</a>
			</div>
		</nav>
		<div class="mode">
			<a href="?theme=light">Light Mode</a>
			<a href="?theme=dark">dark Mode</a>
		</div>

	</header>

</section>