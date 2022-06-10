<?php 

include("style.php");

if( isset($_POST["submit"]) ) {
	if(isset($_POST["num1"]) && isset($_POST["num2"]) ) {
		$num1 = $_POST["num1"];
		$num2 = $_POST["num2"];

		$sum = $num1 + $num2;
		$difference = $num1 - $num2;
		$product = $num1 * $num2;
		$quotient = $num1 / $num2;
	}
}

?>

<section>

<h1>Simple Math</h1>

<p>The sum is: <?=$sum?></p>
<p>The difference is: <?=$difference?></p>
<p>The product is: <?=$product?></p>
<p>The quotient is: <?=$quotient?></p>

<form method="POST">
	<label>Enter the first number</label>
	<input type="number" name="num1">

	<label>Enter the second number</label>
	<input type="number" name="num2">

	<button type="submit" name="submit">submit</button>
</form>

</section>

<style type="text/css">
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		padding-bottom: 10px;
		padding-top: 10px;
	}

	button {
		margin-top: 10px;
	}
</style>