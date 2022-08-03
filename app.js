/*let now = new Date();

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
currentDate.innerHTML = date; */
function showDate(timeStamp) {
  let now = new Date(timeStamp * 1000);
  console.log(now);
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
  return `${day} ${hour}:${minute}`;
}

function showDataResult(response) {
  let updatedCityName = response.data.name;
  let tempElement = document.querySelector("#temperature");
  let cityNameElement = document.querySelector(".cityName");
  let descriptionElement = document.querySelector("#description");
  let currentDateElement = document.querySelector(".currentDate");
  let iconElement = document.querySelector("#icon");
  celsius = response.data.main.temp;
  let temperature = Math.round(celsius);

  cityNameElement.innerHTML = updatedCityName;
  tempElement.innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  descriptionElement.innerHTML = response.data.weather[0].description;
  let timeStamp = response.data.dt;
  currentDateElement.innerHTML = showDate(timeStamp);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

function showCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitElement.classList.remove("active");
  celsiusElement.classList.add("active");
  temperature.innerHTML = Math.round(celsius);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitElement.classList.add("active");
  celsiusElement.classList.remove("active");
  fahrenheitConvertedTemp = (celsius * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitConvertedTemp);
}

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

let temperature = document.querySelector("#temperature");
let searchForm = document.querySelector(".searchForm");
searchForm.addEventListener("submit", changeCityName);

let celsius = null;
let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", showCelsiusTemperature);
let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", showFahrenheitTemperature);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", showCurrentLocationData);

searchCity("Tehran");
