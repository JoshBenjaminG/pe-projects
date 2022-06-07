<?php 

include("style.php");

$number = "";
$name = "";
$message = "";

if(isset($_POST["submitted"])) {
	$number = $_POST['number'];
	$name = $_POST['name'];
	$message = "Your name is " . $name . " and your number is " . $number;
	echo $message;
}
?>


<form method="POST">

	<label>Enter a name</label>

	<input type="string" name="name" placeholder="Josh">

	<label>Enter a number</label>

	<input type="number" name="number" placeholder="12345">

	<button type="submit" name="submitted">Submit</button>

</form>







