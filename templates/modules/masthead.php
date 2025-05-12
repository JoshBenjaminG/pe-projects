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
		<a class='logo' href='https://josheg.com/'>
			<img src="images/JG-logo.svg" alt="">
		</a>

	</nav>


	<nav class='links'>
		<a href="https://josheg.com/" class="hover-underline-animation calm-voice">Home</a>
		<a href="https://codepen.io/JoshuaEg/pens/public" target="_blank" class="hover-underline-animation calm-voice">Codepen</a>
		<a href="https://github.com/JoshBenjaminG" target="_blank" class="hover-underline-animation calm-voice">Github</a>
	</nav>

</mast-head>
