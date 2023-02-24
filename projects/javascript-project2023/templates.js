var templates = {};

templates.reviews = `
		<form>
		<field autocomplete="off">
			<label>Enter a review below</label>
			<input placeholder="Resaurant name" id="name" autocomplete="off">
			<input placeholder="Review..." id="review" autocomplete="off">
			<input type="range" min="1" max="5" class="slider" id="rating">
		</field>

		<button type="submit" class="add">Add</button>
	</form>
	<form autocomplete="off">
		<input id="filter" placeholder="Filter resaurants by name">
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