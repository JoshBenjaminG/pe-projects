var templates = {};

templates.reviews = 
	`<form>
		<field>
			<label>Enter a review below</label>
			<input placeholder="Resaurant name" id="name">
			<input placeholder="Review..." id="review">
		</field>

		<button type="submit" class="add">Add</button>
	</form>
	<form>
		<label>Filter resaurants by type of food</label>
		<input id="filter">
	</form>
	`
	;

templates.home = 
	`<div>homepage page</div>`
	;

templates.list = 
	`<div>list page</div>`
	;

export default templates;