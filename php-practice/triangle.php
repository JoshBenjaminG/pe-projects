<?php 

include("style.php");

if( isset($_POST["submit"]) ) {
	if(isset($_POST["num1"]) && isset($_POST["num2"]) ) {
		$num1 = $_POST["num1"];
		$num2 = $_POST["num2"];

		$side1 = $num1 * $num1;
		$side2 = $num2 * $num2;
		$hypotenuse = $side1 + $side2;
	}
}

?>

<section>

<h1>Calculate the hypotenuse. Enter the sides below.</h1>

<p>The length of the hypotenuse is: <?=$hypotenuse?></p>

<form method="POST">
	<label>Enter the length of side A</label>
	<input type="number" name="num1">

	<label>Enter the length of side B</label>
	<input type="number" name="num2">

	<button type="submit" name="submit">submit</button>
</form>

</section>

