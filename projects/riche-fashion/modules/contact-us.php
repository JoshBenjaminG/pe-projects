<!doctype html>

<html lang='en' class='special-magic no-js'>

	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width, initial-scale=1'>

		<title>PSSST (CSS)</title>
		<meta name='description' content='PSSST (CSS)'>
		<meta property='og:image' content='A CSS methodology so great, it needed a name.'>

		<link rel='stylesheet' href='../styles/site.css'>

	</head>


	<body>

<?php include("header.php"); ?>

<main>
	
<section class="contact-us">
	<inner-column>
		<h2 class="attention-voice">Contact Us</h2>
		<p class="calm-voice">To contact our client services department you can call 123-456-6789 from Monday to Sunday 9:00 am to 8:00 pm or complete the form below. We are at your disposal for questions or request for assistance.</p>
		<div class="form">
			<form method="POST">
			<input type="string" name="age" placeholder="Name">
			<input type="string" name="age" placeholder="Last name">
			<input type="string" name="age" placeholder="email">
			<input type="string" name="age" placeholder="Additional notes">
		</div>
		<button class="form-button" type="submit" name="submit">Continue</button>
</form>
	</inner-column>
</section>

</main>

		<footer>
			<inner-column>

				<?php include("footer.php"); ?>

			</inner-column>
		</footer>
	</body>

</html>