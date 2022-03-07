const searchForm = document.getElementById("searchForm");
const searchBox = document.getElementById("searchBox");

let date = document.querySelector(".date");
date.innerText = new Date().toJSON().slice(0, 10).replace(/-/g, ".");

searchForm.addEventListener("submit", setQuery);

function setQuery(e) {
  e.preventDefault();
  getResults(searchBox.value);
}

function getResults(query) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=8070f39242c0e4c7ac7a1cb709976198`
  )
    .then((weather) => {
      if (weather.ok) {
        return weather.json();
      } else {
        alert("Invalid City!");
      }
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  let temperature = document.querySelector(".temp");
  temperature.innerText = `${weather.main.temp} °C`;
  let currentWeather = document.querySelector(".weather");
  currentWeather.innerText = `${weather.weather[0].main}`;
  let highLow = document.querySelector(".highLow");
  highLow.innerHTML = `${weather.main.temp_max} / ${weather.main.temp_min}<span> °C</span>`;
}
