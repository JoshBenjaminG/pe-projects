var city = "";

var h1 = document.querySelector('h1');
var p = document.getElementById('condition');
var ph = document.getElementById('Humidity');
var pl = document.getElementById('daytime');
var ps = document.getElementById('visiblity');
var lat = document.getElementById('latitude');
var lon = document.getElementById('longitude');

var button = document.createElement('button');

document.body.appendChild(button);

button.textContent = "Submit";

button.addEventListener('click', getApi);

var input = document.getElementById('input');

async function getApi() {
	var city = input.value;
	var api = "http://api.weatherapi.com/v1/current.json?key=1893971150fa4bdd969223007221509&q=" + city + "&aqi=no";
	const response = await fetch(api);
	const data = await response.json();
	console.log(data);
	if (data.current.is_day == 0) {
		pl.textContent = "It's Dark out!";
	} else {
		pl.textContent = "It's light outside!";
	}
	h1.textContent = data.current.temp_f + " degrees fahrenheit";
	// p.textContent = data.current.precip_in + " precipitation Inches";
	p.textContent = "Condition: " + data.current.condition.text;
	ph.textContent = "humidity: " + data.current.humidity;
	ps.textContent = "visiblity in miles: " + data.current.vis_miles;
	lat.textContent = "Latitude: " + data.location.lat;
	lon.textContent = "Latitude: " + data.location.lon;
}