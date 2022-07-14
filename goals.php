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
            "goals" => [ "Complete v3 of my portfolio", "Have a few good projects on my site"],
        ],
        [
            "heading" => "End of month plan (July)",
            "goals" => [ "Finish case study on responsive design", "Create a good WP project", "Reach out to companies near me to introduce myself."],
        ],          
    ];

    $projects = ["Portfolio Site v2", "Alpha-4 Homepage", "Layout Theme Challenge", "Responsive layout challenge", "Crud Challenge", "Routing PHP challenge", "WordPress Intro Project"];

?>

<section class="inner-column goals-page">
	<a href="index.php" class="calm-voice">Home</a>
	<h1 class="loud-voice">Goals Page</h1>
	<ul class="goals">
	    
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

<section class="inner-column projects-list">
	<h3 class="calm-voice">Projects List</h3>
	<ul>
	    <?php foreach ($projects as $project) { ?>
	        <li><?=$project?></li>
	        <br>
	    <?php } ?> 
	</ul>
</section>

</main>

</body>
</html>