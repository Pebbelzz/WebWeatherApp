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
var city = "";

//gets geolocation from browser
function geoload(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude + " " + longitude);
    xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + apiKey);
    xhr.send();
    return latitude, longitude;
    });
  }
  else{
    alert("Geolocation is not supported by this browser")
    //get zipcode input from user and then do alternative GET for API with zip
  }
}

//xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=22980,us&APPID=" + apiKey);
//runs reqListener() once API is loaded
xhr.addEventListener("load", reqListener);

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
  city = jsonWeather.name;
  updateApp();
  setBackground(weatherIcon);
}

//updates HTML with weather data
function updateApp(){
  document.getElementById('temp').innerHTML = temp + "&deg; F";
  document.getElementById('discription').innerHTML = jsonCurrent;
  document.getElementById('icon').innerHTML = "<img src=images/" + weatherIcon + ".png />";
  document.getElementById('geo').innerHTML = city;
  console.log(latitude, longitude)
}

function capitalizeFirstLetter(jsonCurrent) {
    return jsonCurrent.charAt(0).toUpperCase() + jsonCurrent.slice(1);
}

//set background based on weather

//variables for weather to match images
var cloudy = "../images/cloudy.jpg";
var partlyCloudy = "../images/partlyCloudy.jpg";
var rain = "../images/rain.jpg";
var sunny = "../images/sunny.jpg";
var thunder = "../images/thunder.jpg";
var snow = "../images/snow.jpg";
var clearNight = "../images/clearNight.jpg"
var partlyCloudNight = "../images/partlyCloudNight.jpg"
var backgroundImage = "";
var defaultImage = "../images/default.jpg";



function setBackground(weatherIcon){
    switch (weatherIcon){
      case "01d":
        backgroundImage = sunny
        break;
      case "01n":
        backgroundImage = clearNight
        break;
      case "02d":
        backgroundImage = partlyCloudy
        break;
      case "02n":
        backgroundImage = partlyCloudNight
        break;
      case "03d", "03n", "04d", "04n":
        backgroundImage = cloudy
        break;
      case "09d", "09n", "10d", "10n":
        backgroundImage = rain
        break;
      case "11d", "11n":
        backgroundImage = thunder
        break;
      case "13d", "13n":
        backgroundImage = snow
        break;
      default:
        backgroundImage = defaultImage;
    }
  console.log(backgroundImage);
  document.body.style.backgroundImage = "url('" + backgroundImage + "')";

}
