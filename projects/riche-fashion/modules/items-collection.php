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

<?php include("header.php"); 

$json = file_get_contents("../items.json");
$item_data = json_decode($json, true);
$items = $item_data["items"];
$collections = $item_data["collections"];
$collection = $_GET["collection"];

?>

	

<main>
	

<section class="collection-header">
	<inner-column>
	<collection-header>
		<h2 class="header-voice"><?=$collections[$collection]["name"]?></h2>
		<p class="header-p-voice"><?=$collections[$collection]["description"]?></p>
	</collection-header>
	</inner-column>
</section>

<items>

	<?php foreach ($items as $id => $item) { ?>
		<item>
		<a href="item-detail.php?id=<?=$id?>">
		<picture>
			<img src="../images/<?=$item["image"]?>">
		</picture>
		</a>
		<p><?=$item["name"]?></p>
		<p><?=$item["price"]?></p>
		<a href="">View Product ></a>
	</item>
	<?php } ?>


</items>

</main>

	<footer>
			<inner-column>

				<?php include("footer.php"); ?>

			</inner-column>
		</footer>

</body>

</html>