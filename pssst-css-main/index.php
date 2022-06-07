<!doctype html>

<html lang='en' class='special-magic no-js'>

	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width, initial-scale=1'>

		<title>PSSST (CSS)</title>
		<meta name='description' content='PSSST (CSS)'>
		<meta property='og:image' content='A CSS methodology so great, it needed a name.'>

		<link rel='stylesheet' href='styles/site.css'>

	</head>


	<body>
		<header>

			<h1 class='loud-voice'>RICHE</h1>
			<inner-column>
			<nav>
				<a href="">MEN</a>
				<a href="">WOMEN</a>
				<a href="">GIFTS</a>
				<a href="">WHAT’S NEW</a>
				<a href="">GIFTS</a>
				<a href="">HANDBAG</a>
				<a href="">CHILDREN</a>
				<a href="">BEAUTY</a>
			</nav>
			</inner-column>
	
		</header>

		<main>

			<section class="collections">
			<inner-column>

				<?php include("modules/featured-collection.php"); ?>

			</inner-column>
			</section>

			<section class="collection-banner">
			<inner-column>

				<?php include("modules/collection-banner.php"); ?>

			</inner-column>
			</section>

		</main>

		<footer>
			<inner-column>

				<?php include("modules/footer.php"); ?>

			</inner-column>
		</footer>
	</body>

</html>