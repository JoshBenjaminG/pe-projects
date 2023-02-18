function renderPage() {
	var template = 
	`<form action="">
		<field>
			<label>Enter a review below</label>
			<input placeholder="Resaurant name" id="name">
			<input placeholder="Review..." id="review">
		</field>

		<button type="submit">Add</button>
	</form>`
	;
	document.querySelector('output').innerHTML = template;
}

$reviews.addEventListener('click', function(event) {
	renderPage();
	const $form = document.querySelector('form');
	const $name = document.querySelector('#name');
	const $description = document.querySelector('#review');
	renderReviews(reviews, $dombody);
	$form.addEventListener('submit', function(event) {
		event.preventDefault();
		add($name.value, $description.value, $dombody);
		$name.value = "";
		$description.value = "";
});
});

$list.addEventListener('click', function(event){
	$dombody.innerHTML = "";
	template = "Restaurant list";
	$output.innerHTML = template;
	renderRestraunts(reviews);
});

const filtered = getData("reviews").filter((review) => review.id != id);

function renderReviews(filter = null) {
	var template = "<ul>";
	getData("reviews").forEach (function(review) {
		template += renderReview(review);
	});
	template += "</ul>";
	document.querySelector("outlet").innerHTML = template;
}