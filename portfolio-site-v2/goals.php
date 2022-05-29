<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Josh Gage - Developer</title>
	<link rel='stylesheet' href='css/style.css'>
	<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>

<main>

<?php include('header.php'); ?>

<?php 

    $sections = [
        [
            "heading" => "",
            "goals" => [""],
        ],
        [
            "heading" => "End of course plan",
            "goals" => [ "Complete v3 of my portfolio", "Have a large front-end project on my portfolio", "Complete a second project that is more design oriented."],
        ],
        [
            "heading" => "End of month plan (June)",
            "goals" => [ "Finish case study on responsive design", "Finish majority of E4P"],
        ],          
    ];

?>

<section class="inner-column">
	<ul>
	    
	    <?php foreach ($sections as $section) { ?>
	        <li>
	            <h3><?=$section["heading"]?></h3>
	            <?php foreach($section["goals"] as $goal) { ?>
	                <li><?=$goal?></li>
	            <?php } ?>
	        </li>
	    <?php } ?> 
	</ul>
</section>

</main>

</body>
</html>