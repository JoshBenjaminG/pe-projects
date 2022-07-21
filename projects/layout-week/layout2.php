<inner-column>
	
<header class="tuesday-header">
	<p>A little teaser</p>
	<h2>Heading level 2 small</h2>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	tempor incididunt im ad minim veniam,
	quis nostrud exercitation ullamco.</p>
</header>

<ul class="tuesday-ul">
	<?php for ($i=1; $i < 5; $i++) { ?>
		<li class="tuesday-li">
			<picture class="tuesday-svg">
				<?php include("assets/tuesday.svg"); ?>
			</picture>
			<h3>Heading level 3 small</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
		</li>
	<?php } ?>
</ul>

<p class="tuesday-footer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
</p>

</inner-column>