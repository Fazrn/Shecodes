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

function showPredictedDay(timeStamp) {
  let now = new Date(timeStamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[now.getDay()];
  return day;
}

function showPredictedData(response) {
  console.log(response.data.list); // Log the response to inspect the data structure

  let forecastData = response.data.list;
  let futureDaysElement = document.querySelector("#future-days");
  let forecast = `<div class="row">`;

  // Group forecast data by day
  let dailyForecast = {};
  forecastData.forEach((item) => {
    let date = new Date(item.dt * 1000).toLocaleDateString();
    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        temps: [],
        icons: [],
        descriptions: [],
      };
    }
    dailyForecast[date].temps.push(item.main.temp);
    dailyForecast[date].icons.push(item.weather[0].icon);
    dailyForecast[date].descriptions.push(item.weather[0].description);
  });

  // Generate HTML for the next 5 days
  let dayCount = 0;
  for (let date in dailyForecast) {
    if (dayCount >= 5) break; // Limit to 5 days

    let dayData = dailyForecast[date];
    let maxTemp = Math.round(Math.max(...dayData.temps));
    let minTemp = Math.round(Math.min(...dayData.temps));
    let icon = dayData.icons[0]; // Use the first icon of the day
    let description = dayData.descriptions[0]; // Use the first description of the day

    forecast += `
      <div class="col">
        <h5 class="firstPredictedDay">${showPredictedDay(
          new Date(date).getTime() / 1000
        )}</h5>
        <img
          class="predictedIcon"
          src="http://openweathermap.org/img/wn/${icon}@2x.png"
          alt="${description}"
        />
        <p class="predictedTemps">
          <span>${maxTemp}</span>
          <span class="lowestTemp">${minTemp}</span>
        </p>
      </div>
    `;

    dayCount++;
  }

  forecast += `</div>`;
  futureDaysElement.innerHTML = forecast;
}

function getPredictedData(coordinates) {
  let apiKey = "9feaf93d48daeaeeb2d9ea551226a8c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showPredictedData);
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

  getPredictedData(response.data.coord);
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

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", showCurrentLocationData);

searchCity("Tehran");
