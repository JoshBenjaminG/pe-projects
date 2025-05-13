<card>
	<div>
	<?php for ($i=0; $i < $review["rating"]; $i++) { ?>
		<picture class="star">
			<img src="./client-card-star.svg" alt="">
		</picture>
	<?php } ?>
	</div>
	<text-content>
		<p>"<?=$review["content"]?>"</p>
		<p>- <?=$review["name"]?></p>
	</text-content>
</card>