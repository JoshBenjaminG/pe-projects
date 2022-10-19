
<?php get_header(); ?>

<?php 

	if (is_page('home')) {
		include("home.php");
	}

	if (is_page('list')) {
		include("artist-list.php");
	}

	if (is_singular('artists')) {
		include('detail.php'); 
	}

	if (is_singular('albums')) {
		include('album-detail.php'); 
	}

	if (is_404()) {
		echo "<div>This page could not be found.</div>";
	}

?>

<?php get_footer(); ?>

