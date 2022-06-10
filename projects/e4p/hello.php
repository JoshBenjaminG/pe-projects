<?php 

include("style.php");

if(isset($_POST["submit"])) {
	$name = $_POST["name"];

	echo "hello, " . $name . "!";
}

?>

<form method="POST">
	<label>What is your name?</label>
	<input type="string" name="name">
	<button type="submit" name="submit">Submit</button>
</form>