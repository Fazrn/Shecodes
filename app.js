let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute};`;
}
let time = `${hour}:${minute}`;

let date = `${day} ${time}`;

let currentDate = document.querySelector(".currentDate");
currentDate.innerHTML = date;

function showDataResult(response) {
  let temperature = Math.round(response.data.main.temp);
  let updatedCityName = response.data.name;
  let temp = document.querySelector("#temperature");
  let cityName = document.querySelector(".cityName");
  cityName.innerHTML = updatedCityName;
  temp.innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "9feaf93d48daeaeeb2d9ea551226a8c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDataResult);
}

function changeCityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  let city = searchInput.value;
  searchInput.value = "";
  searchCity(city);
}

let searchForm = document.querySelector(".searchForm");

searchForm.addEventListener("submit", changeCityName);

function convertToCelsius() {
  let temperature = document.querySelector("#temperature");
  let tempValue = temperature.innerText;
  celsiusConvertedTemp = ((tempValue - 32) * 5) / 9;
  temperature.innerHTML = Math.round(celsiusConvertedTemp);
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

function convertToFahrenheit() {
  let temperature = document.querySelector("#temperature");
  let tempValue = temperature.innerText;
  fahrenheitConvertedTemp = (tempValue * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitConvertedTemp);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9feaf93d48daeaeeb2d9ea551226a8c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDataResult);
}
function showCurrentLocationData(event) {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", showCurrentLocationData);

searchCity("Tehran");
