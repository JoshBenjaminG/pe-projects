import { add, remove, renderReview, renderReviews, renderPage } from "./helper-functions.js";

var reviews = [];

const $output = document.querySelector('output');
// const $reviews = document.querySelector('[data-to="reviews"]');
// const $list = document.querySelector('[data-to="list"]');
// const $homepage = document.querySelector('[data-to="homepage"]');
const $dombody = document.querySelector('dombody');

$dombody.addEventListener('click', function(event) {	
	if (event.target.textContent == 'remove') {
		const id = event.target.closest('li').dataset.id;
		remove(id);
	}
});


//top level navigation handler
window.addEventListener('click', function(event) {
	if (event.target.matches('[data-to]')) {
		renderPage(event.target.dataset.to);
	}
});



