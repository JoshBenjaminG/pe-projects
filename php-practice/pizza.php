<?php 

include("style.php");

$people = "";
$pizzas = "";
$slices = "";
$finalNumber = "";
$remainder = "";

if(isset($_POST["submit"])) {
	$people = $_POST["people"];
	$pizzas = $_POST["pizzas"];
	$slices = $_POST["slices"];

	$product = $pizzas * $slices;
	$finalNumber = $product / $people;
	$remainder = $product - $finalNumber;


}

echo $people . " people with " . $pizzas . " pizzas";
echo "<br></br>";
echo "each person gets " . $finalNumber . " slices of pizza.";
echo "there are " . $remainder . " slices remaining.";
?>

<form method="POST">
	<label>How many people?</label>
	<input type="string" name="people">
	<label>How many pizzas do you have?</label>
	<input type="string" name="pizzas">
	<label>How many slices per pizza?</label>
	<input type="string" name="slices">
	<button type="submit" name="submit">Submit</button>
</form>