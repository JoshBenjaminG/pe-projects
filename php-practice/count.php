<?php 

if( isset($_POST["submit"]) ) {
	if(isset($_POST["string"]) ) {
		$string = $_POST["string"];
		$stringLength = strlen($string);

		echo "<p>$stringLength is the length of the string.</p>";
	}
}

?>

<form method="POST">
	<label>Type a string.</label>
	<input type="string" name="string">
	
	<button type="submit" name="submit">submit</button>
</form>