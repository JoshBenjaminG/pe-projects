<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<link rel='stylesheet' href='css/style.css'>
</head>
<body>

<?php include 'projects.php'; ?>

<header>

	<nav>
		<a href="">Joshua</a>
		<div>
			<a href="">Projects</a>
			<a href="">Resume</a>
			<a href="">Contact</a>
		</div>
	</nav>

</header>

<main>

	<section class="landing">
		<div class="inner-column">
			<h1 class="intro-voice">Joshua Gage</h1>
			<p class="calm-voice">Your front-end web developer</p>
		</div>
	</section>

	<section class="projects">
		<div class="inner-column">
			<ul>
				
				<?php include 'project-maker.php'; ?>

			</ul>
		</div>
	</section>

</main>

<footer>

	<div>
		<nav>
			<a href="">Links</a>
			<a href="">Links</a>
			<a href="">links</a>
		</nav>
	</div>

</footer>

</body>
</html>