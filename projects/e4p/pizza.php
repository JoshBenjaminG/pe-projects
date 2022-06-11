<?php 

include("style.php");

$people = 5;
$pizzas = 2;
$slicesPerPizza = 8;

if(isset($_POST["submit"])) {
	$people = $_POST["people"];
	$pizzas = $_POST["pizzas"];
	$slicesPerPizza = $_POST["slices"];

}

$totalSlices = $pizzas * $slicesPerPizza;
$rawSlicesPerPerson = $totalSlices / $people;
$remainder = $totalSlices % $rawSlicesPerPerson;
$slicesPerPerson = floor($rawSlicesPerPerson);

?>

<main>

	<h1>E4P #8: Pizza Party</h1>

	<form method="POST">
		<label>How many people?</label>
		<input type="string" name="people" value="<?=$people?>">
		<label>How many pizzas do you have?</label>
		<input type="string" name="pizzas" value="<?=$pizzas?>">
		<label>How many slices per pizza?</label>
		<input type="string" name="slices" value="<?=$slicesPerPizza?>">
		<button type="submit" name="submit">Submit</button>
	</form>

	<output>

	<p><?=$people?> people with <?=$pizzas?> pizzas. Each person gets <?=$slicesPerPerson?> slices of pizza.</p>

	<?php if ($remainder) { ?>
		<p>There are <?=$remainder?> slices remaining.</p>
	<?php } ?>

	</output>

</main>