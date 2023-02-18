import { add, remove, renderReview, renderReviews, renderPage } from "./helper-functions.js";



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
	} if(event.target.dataset.to == 'reviews') {
		console.log('test');
		renderReviews();
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

window.addEventListener("input", function(event) {
	if (event.target.matches("#filter")) {
		event.preventDefault();
		console.log(event.target.value);
	}
})



