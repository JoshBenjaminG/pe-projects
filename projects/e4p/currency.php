<?php 

include("style.php");

if(isset($_POST["submit"])) {
	$USD = $_POST["amount"];
	$Euros = $USD * 0.99;

	echo "<p>You have " . $Euros . " Euros";
}

?>

<form method="POST">
	<label>How much money are you converting?</label>
	<input type="number" name="amount">
	<button type="submit" name="submit">Submit</button>
</form>