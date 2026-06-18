const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector("#search");
const weatherIcon = document.querySelector(".weather-icon");
const appContainer = document.querySelector(".app-container");

const weatherApiKey = "b73cf683175ee492980e122327de8fbd";
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

async function checkWeather(city) {
  document.querySelector(".loading").style.display = "block";
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "none";

  const response = await fetch(weatherURL + city + `&appid=${weatherApiKey}`);
  const data = await response.json();

  document.querySelector(".loading").style.display = "none";

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    appContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("weather.jpg")`;
  } else {
    setTimeout(() => {
      updateData(data);
    }, 500);
  }
}

async function updateData(data) {
  console.log(document.querySelector("#city"));
  console.log(document.querySelector("#country"));
  console.log(document.querySelector("#temp"));
  console.log(document.querySelector("#feels-like"));
  //Update the weather data
  document.querySelector("#city").textContent = data.name;
  document.querySelector("#country").textContent =
    " " + getFlagEmoji(data.sys.country);
  document.querySelector("#temp").textContent =
    Math.round(data.main.temp) + "°c";
  document.querySelector("#feels-like").textContent =
    "Feels Like " + Math.round(data.main.feels_like) + "°c";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + "Km/h";

  //Change the Weather Icon
  const weatherCondition = data.weather[0].main;

  if (weatherCondition == "Clear") {
    weatherIcon.src = "images/clear.png";
    appContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("images/clear_bg.jpg")`;
  } else if (weatherCondition == "Clouds") {
    weatherIcon.src = "images/cloud.png";
    appContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("images/cloud_bg.jpg")`;
  } else if (weatherCondition == "Haze") {
    weatherIcon.src = "images/drizzle.png";
    appContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("images/haze_bg.jpg")`;
  } else if (weatherCondition == "Mist") {
    weatherIcon.src = "images/mist.png";
    appContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("images/mist_bg.jpg")`;
  } else if (weatherCondition == "Rain") {
    weatherIcon.src = "images/rain.png";
    appContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("images/rain_bg.jpg")`;
  } else if (weatherCondition == "Snow") {
    weatherIcon.src = "images/snow.png";
    appContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("images/snow_bg.jpg")`;
  }

  document.querySelector("#condition").textContent = data.weather[0].main;
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

//Default Call
checkWeather("lahore");
updateDate();

searchBtn.addEventListener("click", (e) => {
  checkWeather(searchBox.value.trim());
});

searchBtn.addEventListener("keydown", (e) => {
  checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value.trim());
  }
});

// For date
function updateDate() {
  const now = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };
  document.querySelector("#date").textContent = now.toLocaleDateString(
    "en-US",
    options,
  );
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
