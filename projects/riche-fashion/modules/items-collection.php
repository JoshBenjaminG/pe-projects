<!doctype html>

<html lang='en' class='special-magic no-js'>

	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width, initial-scale=1'>

		<title>PSSST (CSS)</title>
		<meta name='description' content='PSSST (CSS)'>
		<meta property='og:image' content='A CSS methodology so great, it needed a name.'>

		<link rel='stylesheet' href='../styles/site.css'>

	</head>


	<body>

<?php include("header.php"); ?>

<main>
	
<?php 

$json = file_get_contents("../items.json");
$item_data = json_decode($json, true);
$items = $item_data["items"];

//if filter = x
//filter the array 
//set the filtered array to $items

?>
		

<section class="collection-header">
	<inner-column>
	<collection-header>
		<h2 class="header-voice">Love Parade with Donald Riche</h2>
		<p class="header-p-voice">Between two different worlds, going in and out of character and showcasing the versatility of women's styles from the Riche Love Parade collection.</p>
	</collection-header>
	</inner-column>
</section>

<items>

	<?php foreach ($items as $item) { ?>
		<item>
		<a href="item-detail.php">
		<picture>
			<img src="../dress1.jpeg">
		</picture>
		</a>
		<p><?=$item["name"]?></p>
		<p><?=$item["price"]?></p>
		<a href="item-detail.php">View Product ></a>
	</item>
	<?php } ?>


</items>

</main>