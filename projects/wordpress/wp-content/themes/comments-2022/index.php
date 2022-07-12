<?php get_header(); ?>

<?php 
	if (is_page('home')) {
		include("templates/pages/home.php");
	}

	if (is_page('list')) {
		include("templates/pages/list.php");
	}

	if (is_singular('people')) {
		include("templates/pages/detail.php");
	}

	if (is_404()) {
		include("templates/pages/page-not-found.php");
	}
?>

<?php get_footer(); ?>