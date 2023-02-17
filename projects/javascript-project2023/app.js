import { add, remove, renderReview, renderReviews, renderPage, test } from "./helper-functions.js";



const $output = document.querySelector('output');
const $dombody = document.querySelector('dombody');

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
});

window.addEventListener('click', function(event) {
	if (event.target.matches('.add')) {
		event.preventDefault();
		const $name = document.querySelector('#name');
		const $review = document.querySelector('#review');
		add($name.value, $review.value, $dombody);
	}
});

window.addEventListener('click', function(event) {
	if (event.target.matches('.remove')) {
		const id = event.target.closest('li').dataset.id;
		remove(id, $dombody);
	}
});



