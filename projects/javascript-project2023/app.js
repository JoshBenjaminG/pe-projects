import { add, remove, renderReview, renderReviews, renderPage, getData, renderName, renderNames } from "./helper-functions.js";



const $output = document.querySelector('output');

// $dombody.addEventListener('click', function(event) {	
// 	if (event.target.textContent == 'remove') {
// 		const id = event.target.closest('li').dataset.id;
// 		remove(id);
// 	}
// });

renderPage('home');


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
		add($name.value, $review.value);
	}
	if (event.target.matches('.remove')) {
		const id = event.target.closest('li').dataset.id;
		remove(id);
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



