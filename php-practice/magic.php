<?php 

	include('style.php');

	function createCard($name, $attack, $health, $mana, $color, $text, $art) {
		$card = [
			"name" => $name,
			"attack" => $attack,
			"health" => $health,
			"mana" => $mana,
			"color" => $color,
			"text" => $text,
			"art" => $art,
		];
		return $card;
	}

	$shrineKeeper = createCard("Shrine keeper", 2, 2, 2, "white", "", "keeper.jpg");

	$cards = [$shrineKeeper];

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
</head>
<body>

<ul>
<?php foreach ($cards as $card) { ?>
	<li class='<?=$card["color"]?>'>
		<div class="nameMana">
			<h3><?=$card["name"]?></h3>
			<p><?=$card["mana"]?></p>
		</div>
		<img src='<?=$card["art"]?>'>
		<p class="text"><?=$card["text"]?></p>
		<div class="stats">
			<p><?=$card["attack"]?> / </p>
			<p> <?=$card["health"]?></p>
		</div>
	</li>
<?php } ?>
</ul>

</body>
</html>

