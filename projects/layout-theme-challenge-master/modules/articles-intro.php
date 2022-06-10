
<articles-intro>

  <header>
   <!--  <h2 class='attention-voice black-text'>What We Are About</h2>

    <p class='calm-voice black-text'>Whether you need a design, a fresh brand, or know-how, Wollf has you covered.</p> -->
  </header>

  <article-grid>
    <?php include('articles_data.php'); ?><!-- acting as an example database -->

    <?php foreach ($database as $article) { ?> 
      <?php include('article-card.php'); ?>
    <?php } ?>
  </article-grid>

</articles-intro>
