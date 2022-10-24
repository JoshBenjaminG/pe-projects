<?php 

$class = ' ';

if ($page == 'home') {
	$class = 'mast-head-animation';
} else {
	$class = ' ';
}




?>

<mast-head class='<?=$class?>'>

	<nav class='site-menu'>
		<a class='logo' href='?page=home'>
			<img src="images/JG-logo.svg" alt="">
			<!-- or you could actually use the SVG -->
		</a>

	</nav>


	<nav class='links'>
		<!-- <a href='?page=home' class="hover-underline-animation calm-voice">Home</a> -->
		<a href="?page=home" class="hover-underline-animation">Home</a>
		<a href='?page=style-guide' class="hover-underline-animation calm-voice projects-link">Style Guide</a>
		<a href="https://github.com/JoshBenjaminG" target="_blank" class="hover-underline-animation calm-voice">Github</a>
		<!-- <a href="https://resume.creddle.io/resume/j9rrzc7had4" class="hover-underline-animation calm-voice">Resume</a> -->
	<!-- 	<a href='?page=goals' class="hover-underline-animation calm-voice">Goals</a> -->
	</nav>

</mast-head>
