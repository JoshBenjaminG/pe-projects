<?php 

$projects = getData('data/projects.json');

?>

<section class='stuff'>
<inner-column>


  <projects-intro id='projects'>

    <header>
      <h2 class='loud-voice'>Featured Projects...</h2>

      <p>Check out some of my work below!</p>
    </header>



    <project-grid>

      <?php foreach ($projects as $project) { ?> 
        <?php include('templates/modules/project-card.php'); ?>
      <?php } ?>
    </project-grid>

  </projects-intro>

</inner-column>
</section>
