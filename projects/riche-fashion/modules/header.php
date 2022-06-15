<?php 


$json = file_get_contents("../items.json");
$item_data = json_decode($json, true);
$items = $item_data["items"];

//if filter = x
//filter the array 
//set the filtered array to $items

?>
		

<header>

	<a href="../index.php" class='loud-voice logo'>RICHE</a>
	<inner-column>
	<nav>
		<a href="/modules/items-collection.php">MEN</a>
		<a href="/modules/items-collection.php">WOMEN</a>
		<a href="/modules/items-collection.php">FORCE</a>
		<a href="/modules/items-collection.php">WHAT’S NEW</a>
		<a href="/modules/items-collection.php">HANDBAG</a>
		<a href="/modules/items-collection.php">BEAUTY</a>
	</nav>
	</inner-column>

</header>

<main>