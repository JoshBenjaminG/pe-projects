

<mast-head>

	<nav class='site-menu'>
		<ul>
		<li>
				<a class='home logo' href='?page=home&mode=light'>
					<?php include('images/lion-svg.svg'); ?>
				</a>
			</li>

			<li>
				<a href='?page=home&mode=light' class="	<?php if ($_GET['mode'] == "light") { echo "active"; } ?>">Light Mode</a>
			</li>

			<li>
				<a href='?page=home&mode=dark' class="<?php if ($_GET['mode'] == "dark") { echo "active"; } ?>">Dark Mode</a>
			</li>
		</ul>
	</nav>

	<nav class='user-menu'>
		<ul>
			<li>
				<a class='button' href='#'>Sign in</a>
			</li>
		</ul>
	</nav>

</mast-head>
