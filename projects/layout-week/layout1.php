<inner-column class="monday">

<div class="monday-text">

<header class="monday-header">
	<h2>Heading level 2 small</h2>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	tempor incididunt im ad minim veniam,
	quis nostrud exercitation ullamco.</p>
</header>

<ul class="monday-ul">
	<?php for ($i=1; $i < 7; $i++) { ?>
		<li class="monday-li">
			<h3>Heading level 3 small</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
		</li>
	<?php } ?>
</ul>

</div>

<image-grid class="monday-images">
	
	<?php for ($i=1; $i < 5; $i++) { ?>
		<picture>
			<img src="https://peprojects.dev/images/square.jpg">
		</picture>
	<?php } ?>

</image-grid>

</inner-column>