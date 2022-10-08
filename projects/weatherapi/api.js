
var city = "";



const output = document.querySelector('output');

const form = document.querySelector('form');

var input = document.querySelector('input');

function heatWarning(heat) {
	if (heat > 65) {
		return `It's really hot!`;
	} else {
		return `It's not hot.`;
	}
}

function createResults(result) {
	return `
		<h1>Weather in ${result.location.name}</h1>
		<p id="temp">${result.current.temp_f}&#8457</p>
		<div class='condition'>
		<picture>
			<img src="${result.current.condition.icon}" alt="">
		</picture>
		<p>Condition: ${result.current.condition.text}</p>
		</div>
		<p>Precipitation: ${result.current.precip_in} inches</p>
		<p>Humidity: ${result.current.humidity}%</p>
		<p>Visibility: ${result.current.vis_miles} miles</p>
		<p>Image source: Unslpash.com</p>
	`;
}

function createError(input) {
	return `
		<h1>There was an error: ${input} does not exist.</h1>
	`;
}

function getApi() {
	var city = input.value;
	var request = "https://api.weatherapi.com/v1/current.json?key=1893971150fa4bdd969223007221509&q=" + city + "&aqi=no";
	fetch(request)
		.then( function (response) {
			return response.json();
		})
		.then( function(json) {
			output.innerHTML = createResults(json);
			console.log(json);
			document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";
		})
		.catch( function(error) {
			output.innerHTML = createError(city);
		})
	;
}

form.addEventListener('submit', function (event) {
	event.preventDefault();
	getApi();
});



