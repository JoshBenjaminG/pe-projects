var templates = {};

templates.reviews = `
	<form novalidate>
		<field autocomplete="off">
			<label>Enter a review below</label>
			<input placeholder="Resaurant name" id="name" autocomplete="off" required>
			<input placeholder="Review..." id="review" autocomplete="off" required>
			<input type="range" min="1" max="5" class="slider" id="rating" required>
		</field>

		<button type="submit" class="add">Add</button>
	</form>
	<form autocomplete="off">
		<input id="filter" placeholder="Filter resaurants by name" required>
	</form>
	<outlet></outlet>
	`
	;

templates.home = `
	<div>homepage page</div>`
	;

templates.list = `
	<div>list page</div>
	<outlet></outlet>
	`
	;

export default templates;