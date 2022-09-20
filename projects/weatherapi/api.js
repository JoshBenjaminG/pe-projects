
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
		<h1 id="temp">Temperature fahrenheit: ${result.current.temp_f}</h1>
		<p>${heatWarning(result.current.temp_f)}</p>
		<p>Condition is: ${result.current.condition.text}</p>
		<p>Precipitation: ${result.current.precip_in}</p>
		<p>Humidity: ${result.current.humidity}</p>
		<p>Visibility in miles: ${result.current.vis_miles}</p>
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

var test = document.createElement('h2');
test.textContent = "TESTING!";
document.body.appendChild(test);
test.style.color = "blue";



