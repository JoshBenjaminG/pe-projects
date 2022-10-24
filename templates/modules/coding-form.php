<?php  


	$heading = $section["heading"] ?? "";
	$img = $section["img"] ?? "images/research-picture.jpg";
	$caption = $section["caption"] ?? "<p class='calm-voice'>Images sometimes need captions!</p>";
	$description = $section["description"] ?? "<p class='calm-voice'>Images sometimes need descriptions!</p>";
	$second_img = $section["second_img"] ?? "";

?>

<body>
	
	<h1>Say Hello!</h1>
	<output></output>

<script type="text/javascript">
		
var button = document.createElement('button');
document.body.appendChild(button);
button.textContent = "say hello!";
button.addEventListener('click', sayHello)
var output = document.querySelector('output');

function sayHello() {
	var name = prompt("Enter your name");
	output.textContent = "Hello " + name;
}

</script>

</body>
