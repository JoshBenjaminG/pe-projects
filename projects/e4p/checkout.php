<?php 

include("style.php");

if(isset($_POST["submit"])) {
	$item1 = $_POST["item1"];
	$item2 = $_POST["item2"];
	$item3 = $_POST["item3"];
	$sum = $item1 + $item2 + $item3;
	$subtotal = $sum * 0.055;
	$total = $sum + $subtotal;

	echo "<p>Your tax is " . $subtotal . " and your total is " . $total;
}

?>

<form method="POST">
	<label>How much is item 1?</label>
	<input type="number" name="item1">
	<label>How much is item 2?</label>
	<input type="number" name="item2">
	<label>How much is item 3?</label>
	<input type="number" name="item3">
	<button type="submit" name="submit">Submit</button>
</form>