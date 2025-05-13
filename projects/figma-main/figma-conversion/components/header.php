<?php 

$actions = $module["actions"];
$style = $module["type"];

?>
	
	<body>
		<div class='site-header'>
		<inner-column>

			<header class="<?=$style?>">

				<nav><img src="images/logoipsum.svg" alt="" class="logo"></nav>

				<nav class='links'>
					<a href="?page=page-1">Page 1</a>
					<a href="?page=page-2">Page 2</a>
				</nav>

				<nav class='links'>
				<?php foreach($actions as $action) { ?>
					<a href="" class="<?=$action["link_class"]?>"><?=$action["link"]?></a>
				<?php } ?>
				</nav>

			</header>

		</inner-column>
		</div>


		<main class='page-content'>
			<!-- STUFF -->
