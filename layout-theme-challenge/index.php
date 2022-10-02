<!doctype html>

<?php 



	$page = "";

	if ( isset($_GET['page']) ) {
		$page = $_GET['page'];
	} else {
		$page = "home";
	}

	function getPage($thisPage) {
		include($thisPage . ".php");
	}

	$body = "";

	if ($_GET['mode'] == "dark") {
		$body = "dark";
	}


	// if ($page == "home") {
	// 	include('home.php');
	// } elseif ($page == "detail") {
	// 	include('detail.php');
	// } elseif ($page == "create") {
	// 	include('create.php');
	// }

?>

<html lang='en' class='special-magic no-js'>

	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width, initial-scale=1'>

		<title>PSSST (CSS)</title>
		<meta name='description' content='PSSST (CSS)'>
		<meta property='og:image' content='A CSS methodology so great, it needed a name.'>

		<link rel='stylesheet' href='styles/site.css'>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Gilda+Display&family=Roboto+Serif:opsz,wght@8..144,100&display=swap" rel="stylesheet">
	</head>


</html>

<?php include('data/articles.php'); ?>

	<body class="<?=$body?>">
		<a href="?page=create&mode=light">Create Page</a>
		<header class="site-header <?=$body?>">
		<inner-column>
			
			<?php include('modules/mast-head/template.php'); ?>

		</inner-column>	
		</header>

		<main>

			<?php getPage($page); ?>


		</main>

		<footer>
		<inner-column>
			
			<?php include('modules/site-map/template.php'); ?>

		</inner-column>
		</footer>
	</body>