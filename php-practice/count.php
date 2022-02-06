<?php 

include("style.php");

$formSubmitted = isset($_POST["submit"]);
$inputSubmitted = isset($_POST["string"]);
$message = "Input a string";
$string = "Cat";


if ($formSubmitted) {
	if($inputSubmitted) {
		$string = $_POST["string"];
	}
}

$stringLength = strlen($string);
$message = "<p>$stringLength is the length of the string.</p>";

?>

<h2>Input your word to see how long it is.</h2>

<form method="POST">
	<label>Type a string.</label>
	<input type="string" name="string" value="<?=$string?>">
	
	<button type="submit" name="submit">submit</button>
</form>

<p><?=$message?></p>