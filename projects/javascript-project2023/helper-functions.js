import templates from './templates.js';

// function initialize() {
// 	if (localStorage) {
// 	var reviews = data.getItem('reviews');
// } else {
// 	var reviews = [];
// }
// }
var count = 0;


//fetch local storage
//if no local storage, initialize nothing
//print it

function initialize() {
	if (!localStorage.getItem("reviews")) {
		localStorage.setItem("reviews", JSON.stringify([]));
	}
}
initialize();

function renderPage(page) {
	console.log(page);
	document.querySelector('output').innerHTML = templates[page];
}

function getData(keyNameString) {
	return JSON.parse(localStorage.getItem(keyNameString) );
}

function setData(keyNameString, value) {
	return localStorage.setItem(keyNameString, JSON.stringify(value) );
}

function add(name, description, place) {
	var reviews = getData("reviews");
	console.log(reviews);
	const review = {
		id: `a-${count++}`,
		name: name,
		description: description,
	};
	reviews.push(review);
	setData("reviews", reviews);
	renderReviews();
}

function remove(id, place) {
	const filtered = reviews.filter (function(review) {
		return review.id != id;
	});

	reviews = [...filtered];
	renderReviews();
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

function renderReviews() {
	var template = "<ul>";
	getData("reviews").forEach (function(review) {
		template += renderReview(review);
	});
	template += "</ul>";
	document.querySelector("dombody").innerHTML = template;
}

export {
	add,
	remove,
	renderReview,
	renderReviews,
	renderPage
}