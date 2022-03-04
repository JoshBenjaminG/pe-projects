<?php 
	
	include("functions.php");
	include("modules/header.php"); 

?>

<main>

	<?php 

		$page = 'home';

		if (isset($_GET['page'])) {
			$page = $_GET['page'];	
		} 

		if ($page == 'home') {
			include('pages/home.php');
		} 

		if ($page == 'projectDetail') {
			include('pages/project-detail.php');
		}

		if ($page == 'resume') {
			include('pages/resume.php');
		}

	?>
		



</main>




