
<!-- <call-to-action>
	<h2 class='attention-voice'>A <span>l</span>ittle a<span>bo</span>ut <span>m</span>e...</h2>

	<p class='calm-voice'><span class="intro">As a web developer from the Gulf Coast,</span> I discovered my passion for development in my last year of college. While I completed my formal education, I enrolled in a remote web development program to build on and reinforce my learning progress.</p>

	<p class="calm-voice"><span class="intro">I'm currently studying</span> the entire development process at Perpetual Education. Find me and other students at the <a href="https://peprojects.dev/alpha-4/">Alpha Net.</a> Definitely look at my <a href="https://github.com/JoshuaEgage">Github</a> and Don’t hesitate to check me out at <a href="https://www.linkedin.com/in/joshua-gage-nm511/">LinkedIn!</a>
</call-to-action>

<call-to-action>
	<h2 class='loud-voice'>A little about me...</h2>
	<p class='calm-voice'>After setting foot in design and development at Perpetual Education, I got my start in contractor development. Now I'm a website specialist delivering results in the hospitality industry.</p>
</call-to-action> -->

<?php 

$header = $module["header"];
$content = $module["content"];


?>



<section class='get-involved'>

	<inner-column>
	<intro-grid>
		<call-to-action>
			<?php if ($header) { ?>
				<h2 class='loud-voice'><?=$header?></h2>
			<?php } ?>

			<?php if ($content) { ?>
				<p class='calm-voice'><?=$content?></p>
			<?php } ?>
		</call-to-action>
	</intro-grid>
	</inner-column>

</section>
