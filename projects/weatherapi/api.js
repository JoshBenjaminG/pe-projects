
var city = "";



const output = document.querySelector('output');
const output2 = document.querySelector('daysoutput');

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
		<p class="temp">${result.current.temp_f}&#8457</p>
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

function createForecast(result) {
	result.forecast.forecastday.forEach( function(entry) {
		output2.innerHTML += `
			<div class="day">
			<content>
				<p>${entry.date}</p>
				<p class="temp">${entry.day.avgtemp_f}&#8457</p>
				<div class='condition'>
				<picture>
					<img src="${entry.day.condition.icon}" alt="">
				</picture>
				<p>Condition: ${entry.day.condition.text}</p>
				</div>
			</content>
			</div>
		`;
	});
}

function createError(input) {
	return `
		<h1>There was an error: ${input} does not exist.</h1>
	`;
}

function getApi() {
	var city = input.value;
	var request = "https://api.weatherapi.com/v1/forecast.json?key=1893971150fa4bdd969223007221509&q=" + city + "&days=5&aqi=no&alerts=no";
	fetch(request)
		.then( function (response) {
			return response.json();
		})
		.then( function(json) {
			output.innerHTML = createResults(json);
			output2.innerHTML = "";
			createForecast(json);
			console.log(json);
			if (city == "mobile") {
				document.body.style.backgroundImage = "url('https://www.cityofmobile.org/assets/images/mobile-hdr.jpg')";
			} else {
				document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";
			}
			
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



