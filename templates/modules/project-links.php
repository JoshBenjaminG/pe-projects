<?php 

	$github = $section["github"] ?? "Project Text Content Github";
	$site_link = $section["site_link"] ?? "Project Text Content Live Site";
	
?>

<?php if ($page == 'style-guide') { ?>
<inner-column>
<?php } ?>
<generic-text>

	<nav class="project-links">
		<a href="<?=$github?>" target='_blank'>Github</a>
		<?php if(isset( $section["site_link"])) { ?>
			<a href='<?=$site_link?>' target='_blank'>Live Demo</a>
		<?php } ?>
	</nav>

</generic-text>
<?php if ($page == 'style-guide') { ?>
</inner-column>
<?php } ?>