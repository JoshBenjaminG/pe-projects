import { add, remove, renderReview, renderReviews, renderPage, getData, renderName, renderNames, createUser, logIn, logOut } from "./helper-functions.js";



const $output = document.querySelector('output');
const $message = document.querySelector('message');

renderPage('reviews');
renderReviews();




//top level navigation handler
window.addEventListener('click', function(event) {
	if (event.target.matches('[data-to]')) {
		renderPage(event.target.dataset.to);
	} 
	if (event.target.dataset.to == 'list') {
		renderNames();
	} 
	if (event.target.dataset.to == 'reviews') {
		renderReviews();
	} 
	if (event.target.matches('.add')) {
	    event.preventDefault();
	    const $name = document.querySelector('#name');
	    const $review = document.querySelector('#review');
	    const $rating = document.querySelector('#rating');
	    var users = getData("users");
	    console.log(users);
	    var userId = null; // declare and initialize userId outside of the loop
	    users.forEach(function(user) {
	        if (user.logIn == true) {
	            userId = user.name; // assign value of userId to user ID of logged-in user
	            console.log(userId);
	        }
	    });
	    add($name.value, $review.value, $rating.value, userId);
	}
	if (event.target.matches('.remove')) {
		const id = event.target.closest('li').dataset.id;
		remove(id);
	}
	if (event.target.matches('.create-user')) {
		event.preventDefault();
		const $username = document.querySelector('#username');
		const $password = document.querySelector('#password');
		createUser($username.value, $password.value);
		console.log("username: " + $username.value);
		console.log("password: " + $password.value);
		$message.innerHTML = "user created";
	}
	if (event.target.matches('.login')) {
		event.preventDefault();
		const $loginusername = document.querySelector('#loginusername');
		const $loginpassword = document.querySelector('#loginpassword');
		logIn($loginusername, $loginpassword);
		$message.innerHTML = "user logged in";
	}
	if (event.target.matches('.logOut')) {
		event.preventDefault();
		logOut();
		$message.innerHTML = "user logged out";
	}
});

window.addEventListener("input", function(event) {
	if (event.target.matches("#filter")) {
		var userInput = event.target.value.toLowerCase();
		var filtered = getData("reviews").filter(function(review) {
			return review.name.toLowerCase().includes(userInput);
		});
		renderReviews(filtered);
	}
})



