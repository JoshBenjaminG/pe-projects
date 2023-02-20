var templates = {};

templates.reviews = `
		<form>
		<field>
			<label>Enter a review below</label>
			<input placeholder="Resaurant name" id="name">
			<input placeholder="Review..." id="review">
		</field>

		<button type="submit" class="add">Add</button>
	</form>
	<form>
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