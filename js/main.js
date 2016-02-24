var apiKey = "e6c47f1e9183d0caabe500cc5023112b";
var temp = 0;
var xhr = new XMLHttpRequest();
var jsonWeather = "";
var jsonCurrent = "";
var weatherDiscription = "";
var weatherIcon = "";
var Kelvintemp = 0;
var latitude = 0;
var longitude = 0;

/*if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(showPosition, showError);
  function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude + ", " + longitude);
  }
  function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			alert("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			alert("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			alert("An unknown error occurred.");
			break;
	}
}

}
*/

//gets geolocation from browser
function geoload(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    document.getElementById('geo').innerHTML = "latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude;
    console.log(position.coords.latitude);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    return latitude, longitude;
    });
  }
}


xhr.addEventListener("load", reqListener);
xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=22980,us&APPID=" + apiKey);
xhr.send();

//grab JSON data
function reqListener(){
  jsonWeather = JSON.parse(this.responseText);
  console.log(jsonWeather);
  jsonCurrent = jsonWeather.weather[0].description;
  //capitalize first letter of the weather discription
  jsonCurrent = jsonCurrent.charAt(0).toUpperCase() + jsonCurrent.slice(1);
  //get temp and then convert from Kelvin to Farhenheight
  Kelvintemp = jsonWeather.main.temp;
  temp = Math.floor((Kelvintemp - 273.15) * 1.8 + 32);
  //sets icon based on weather icon code form JSON
  weatherIcon = jsonWeather.weather[0].icon;
  updateApp();
}

//updates HTML with weather data
function updateApp(){
  document.getElementById('temp').innerHTML = temp + "&deg; F";
  document.getElementById('discription').innerHTML = jsonCurrent;
  document.getElementById('icon').innerHTML = "<img src=images/" + weatherIcon + ".png />";
  console.log(latitude, longitude)
}

function capitalizeFirstLetter(jsonCurrent) {
    return jsonCurrent.charAt(0).toUpperCase() + jsonCurrent.slice(1);
}
