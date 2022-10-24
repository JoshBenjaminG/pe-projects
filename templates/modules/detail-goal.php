<?php 

//get the projects 
$projects = getData("data/projects.json");
$slug = $_GET['project'];

$this_project = null;

foreach ($projects as $project) {
	if ($project["slug"] == $slug) {
		$this_project = $project;
	}
}
?>

<case-study>
<inner-column>
	<h1 class="project-name"><?=$this_project["heading"]?></h3>
	<?php foreach($this_project["case-study"]["sections"] as $section) { ?>

	<section class="module-section">
	<case-study-grid>

		<?php include("templates/modules/$section[module].php"); ?>

	</case-study-grid>
	</section>

	<?php } ?>
</inner-column>
</case-study>