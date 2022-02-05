<?php

$formSubmitted = isset($_POST["submit"]);
$height = $_POST["height"];
$width = $_POST["width"];
$message = "<p>enter the height</p>";



if ($formSubmitted) {
	if(isset($_POST["height"]) ) {
		$area = $width * $height;
	}
}


$message = "<p>area is $area</p>";

echo $message;

?>

<h2>Rectangle area calculator.</h2>

<form method="POST">
	<label>What's the width?</label>
	<input type="number" name="width">

	<label>What's the height?</label>
	<input type="number" name="height">
	
	<button type="submit" name="submit">submit</button>
</form>