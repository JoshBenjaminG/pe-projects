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
		</a>

	</nav>


	<nav class='links'>
		<a href="?page=home" class="hover-underline-animation calm-voice">Home</a>
		<a href='?page=style-guide' class="hover-underline-animation calm-voice projects-link">Style Guide</a>
		<a href="https://github.com/JoshBenjaminG" target="_blank" class="hover-underline-animation calm-voice">Github</a>
	</nav>

</mast-head>
