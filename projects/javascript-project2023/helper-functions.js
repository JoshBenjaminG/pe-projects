import templates from './templates.js';

// function initialize() {
// 	if (localStorage) {
// 	var reviews = data.getItem('reviews');
// } else {
// 	var reviews = [];
// }
// }


//fetch local storage
//if no local storage, initialize nothing
//print it

var seedData = [
		{
			id: "12341234",
			name: "mellow",
			description: "good pizza"
		},
		{
			id: "6234624362",
			name: "KFC",
			description: "good chicken"
		},
	]

function initialize() {
	if (!localStorage.getItem("reviews")) {
		console.log(seedData);
		localStorage.setItem("reviews", JSON.stringify(seedData));
	} else {
		console.log(getData("reviews"));
		console.log(getData("reviews")[0].name);
	}
}
initialize();

function renderPage(page) {
	document.querySelector('output').innerHTML = templates[page];
}

function getData(keyNameString) {
	return JSON.parse(localStorage.getItem(keyNameString) );
}

function setData(keyNameString, value) {
	return localStorage.setItem(keyNameString, JSON.stringify(value) );
}

function add(name, description, type, place) { 
	var reviews = getData("reviews");
	console.log(reviews);
	const review = {
		id: Date.now(),
		name: name,
		description: description
	};
	reviews.push(review);
	setData("reviews", reviews);
	renderReviews();
}

function remove(id) {
	const filtered = getData("reviews").filter(function(review) {
		return review.id != id;
	});
	setData("reviews", filtered);
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

function renderReviews(filter = null) {
	var template = "<ul>";
	if (!filter) {
		filter = getData("reviews");
	}
	filter.forEach (function(review) {
		template += renderReview(review);
	});
	template += "</ul>";
	document.querySelector("outlet").innerHTML = template;
}

function renderName(review) {
	return `
		<li data-id=${review.id}>
			<card>
			<h2>${review.name}</h2>
			</card>
		</li>
	`;
}

function renderNames(filter = null) {
	var template = "<ul>";
	if (!filter) {
		filter = getData("reviews");
	}
	filter.forEach (function(review) {
		template += renderName(review);
	});
	template += "</ul>";
	document.querySelector("outlet").innerHTML = template;
}

export {
	add,
	remove,
	renderReview,
	renderReviews,
	renderPage,
	getData,
	renderName,
	renderNames
}