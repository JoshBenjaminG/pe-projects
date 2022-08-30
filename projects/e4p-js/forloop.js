var arr = [
	"small meme",
	"big cringe",
	"small haha",
	"big memelord",
	"big tincanman",
	"big ayo",
	"small let's go",
	"big",
];

var arr2 = [
	{
		name: "big",
		drink: "soda",
		type: "trash",
	},
	{
		name: "small",
		drink: "juice",
		type: "trash",
	},
	{
		name: "medium",
		drink: "coffee",
		type: "trash",
	},
	{
		name: "extra large",
		drink: "beer",
		type: "good",
	},
	{
		name: "kids",
		drink: "water",
		type: "good",
	},
];

function printItem(items, heading) {
	var h1 = document.createElement('h1');
	h1.innerHTML = heading;
	document.body.appendChild(h1);

	var ol = document.createElement('ol');

	items.forEach( function(item) {
		var li = document.createElement('li');
		li.innerHTML = item.name + " " + item.drink;
		ol.appendChild(li);
	});
	document.body.appendChild(ol);
}

arr.forEach(function(item, index, meme) {
	console.log(item, index, meme);
});


