var templates = {};

templates.reviews = 
	`<form>
		<field>
			<label>Enter a review below</label>
			<input placeholder="Resaurant name" id="name">
			<input placeholder="Review..." id="review">
		</field>

		<button type="submit">Add</button>
	</form>`
	;

templates.home = 
	`<div>homepage page</div>`
	;

templates.list = 
	`<div>list page</div>`
	;

export default templates;