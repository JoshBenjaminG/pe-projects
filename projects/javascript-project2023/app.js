var reviews = [];
var count = 0;

const $output = document.querySelector('output');
const $one = document.querySelector('#one');
const $two = document.querySelector('#two');
const $dombody = document.querySelector('dombody');

function add(name, description) {
	const review = {
		id: `a-${count++}`,
		name: name,
		description: description,
		complete: false,
	};
	reviews = [...reviews, review];
	renderReviews(reviews);
}

function remove(id) {
	const filtered = reviews.filter (function(review) {
		return review.id != id;
	});

	reviews = [...filtered];
	renderReviews(reviews);
}

function complete(id) {
	for (let i = 0; i < reviews.length; i++) {
		if (reviews[i].id == id) {
			reviews[i].complete = true;
		}
	}
	renderReviews(reviews);
}

function renderReview(review) {
	return `
		<li data-id=${review.id}>
			<card>
			<h2>${review.name}</h2>
			<p>${review.description}</p>

			<actions>
				<button>remove</button>
			</actions>

			</card>
		</li>
	`;
}

function renderReviews(reviews) {
	var template = "<ul>";
	reviews.forEach (function(review) {
		template += renderReview(review);
	});
	template += "</ul>";
	$dombody.innerHTML = template;
}

$dombody.addEventListener('click', function(event) {	
	if (event.target.textContent == 'remove') {
		const id = event.target.closest('li').dataset.id;
		remove(id);
	}
});

$one.addEventListener('click', function(event){
	event.preventDefault();
	template = 
	`<form action="">
		<field>
			<label>Enter a review below</label>
			<input placeholder="Resaurant name" id="name">
			<input placeholder="Review..." id="review">
		</field>

		<button type="submit">Add</button>
	</form>`
	;
	$output.innerHTML = template;
	const $form = document.querySelector('form');
	const $name = document.querySelector('#name');name
	const $description = document.querySelector('#review');
	renderReviews(reviews);
	$form.addEventListener('submit', function(event) {
		event.preventDefault();
		add($name.value, $description.value);
		$name.value = "";
		$description.value = "";
});
});

$two.addEventListener('click', function(event){
	event.preventDefault();
	template = "Restaurant list";
	$output.innerHTML = template;
	$dombody.innerHTML = "";
});

