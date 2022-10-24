<?php 

$error_message = "";
$message = false;


if(isset($_POST['submit'])) {
	$to = "joshuaegage@gmail.com";
    $subject = "Personal site message";

	if (strlen($_POST['name']) > 0) {
		$name = $_POST['name'];
	}
	if (strlen($_POST['message']) > 0) {
		$message = $name . " wrote:" . "\n\n" . $_POST['message'] . "\n\n" . "The email is: " . $_POST['email'];
	}
    if ($message) {
    	mail($to, $subject, $message);
    } else {
    	$error_message = "<div>There was an error.</div>";
    }
}


?>

<section class='contact-me'>
	<inner-column>

		<contact-me>
	

			<h2 class="loud-voice">Let's talk!</h2>
			<p>Interesting in working with me? Let's get in touch.</p>

			<?=$error_message?>
			<form action="" method="post">

				<input type="text" name="name" placeholder="Name"><br>
				<input type="text" name="email" placeholder="Enter your email..."><br>
				<textarea rows="5" name="message" cols="30" placeholder="Enter Message..."></textarea><br>
				<input type="submit" name="submit" value="Submit" class="form-input">
			</form>
			

		</contact-me>

	</inner-column>
</section>

