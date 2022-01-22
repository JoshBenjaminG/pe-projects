
  <article-carousel data-flickity>
    <?php include('articles_data.php'); ?><!-- acting as an example database -->

    <?php foreach ($allarticles as $article) { ?> 
      <?php include('article-card.php'); ?>
    <?php } ?>
  </article-carousel>


