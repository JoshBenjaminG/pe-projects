import templates from './templates.js';

var reviews = [];
var count = 0;

function renderPage(page) {
	console.log(page);
	document.querySelector('output').innerHTML = templates[page];
}

function test(name, place) {
	const review = {
		name: name,
	};
	reviews = [...reviews, review];
	console.log(reviews);
	renderReviews(reviews, place)
}

function add(name, description, place) {
	const review = {
		id: `a-${count++}`,
		name: name,
		description: description,
	};
	reviews = [...reviews, review];
	renderReviews(reviews, place);
}

function remove(id, place) {
	const filtered = reviews.filter (function(review) {
		return review.id != id;
	});

	reviews = [...filtered];
	renderReviews(reviews, place);
}

function renderReview(review) {
	return `
		<li data-id=${review.id}>
			<card>
			<h2>${review.name}</h2>
			<p>${review.description}</p>

			<actions>
				<button class="remove">remove</button>
			</actions>

			</card>
		</li>
	`;
}

function renderReviews(reviews, place) {
	var template = "<ul>";
	reviews.forEach (function(review) {
		template += renderReview(review);
	});
	template += "</ul>";
	place.innerHTML = template;
}

export {
	add,
	remove,
	renderReview,
	renderReviews,
	renderPage,
	test
}