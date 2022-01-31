<?php

if( isset($_POST["submit"]) ) {
	if(isset($_POST["quote"]) && isset($_POST["author"]) ) {
		$quote = $_POST["quote"];
		$author = $_POST["author"];
		$message = ' "' . $quote . '" ' . ' - ' . $author;
	}
}

?>

<p><?=$message?></p>


<form method="POST">
	<label>What is the quote?</label>
	<input type="string" name="quote">
	<label>Who said it?</label>
	<input type="string" name="author">
	<button type="submit" name="submit">submit</button>
</form>