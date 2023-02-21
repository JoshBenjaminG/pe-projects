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
			id: 12341234,
			name: "mellow",
			description: "good pizza",
			rating: 5
		},
		{
			id: 6234624362,
			name: "KFC",
			description: "good chicken",
			rating: 5
		},
	]

var seedUser = [
		{
			id: 18250452345,
			name: "Josh",
			password: "admin"
		},
	]

function initialize() {
	if (!localStorage.getItem("reviews")) {
		localStorage.setItem("reviews", JSON.stringify(seedData));

	} if (!localStorage.getItem("users")) {
		localStorage.setItem("users", JSON.stringify(seedUser));
	} if (getData("users")[0].name == "Josh" && getData("users")[0].password == "admin") {

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

function createUser(username, password) {
	var users = getData("users");
	const user = {
		id: Date.now(),
		name: username,
		password: password
	};
	users.push(user);
	setData("users", users);
}

function add(name, description, rating) { 
	var reviews = getData("reviews");
	console.log(reviews);
	const review = {
		id: Date.now(),
		name: name,
		description: description,
		rating: rating
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

function tester() {
	for(var i = 0; i < review.rating; i++) {
		console.log('testing');
	}
}



function renderReview(review) {
	var stars = "";
	for(var i = 0; i < review.rating; i++) {
		stars += `<span class="fa fa-star checked"></span>`;
	}
	return `
		<li data-id=${review.id}>
			<card>
			<h2>${review.name}</h2>
			<p>${review.description}</p>
			<p>${stars}</p>

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
		tester();
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
	renderNames,
	createUser
}