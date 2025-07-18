const apiKey = "38476980d9d662566b598e85cc6a5a84";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-btn");
const clearBtn = document.querySelector(".clear-btn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".Weather");
const errorMessage = document.querySelector(".error");
const loader = document.getElementById("loader");

// Hide sections initially
weatherContainer.style.display = "none";
errorMessage.style.display = "none";
loader.style.display = "none";

async function checkWeather(city) {
  if (city.trim() === "") {
    clearOutput();
    return;
  }

  showLoader();

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      showError();
    } else {
      const data = await response.json();
      document.querySelector(".city").innerText = data.name;
      document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerText = data.main.humidity + "%";
      document.querySelector(".wind").innerText = data.wind.speed + " km/h";

      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "wimages/clouds.png";
          break;
        case "Clear":
          weatherIcon.src = "wimages/clear.png";
          break;
        case "Rain":
          weatherIcon.src = "wimages/rain.png";
          break;
        case "Drizzle":
          weatherIcon.src = "wimages/drizzle.png";
          break;
        case "Mist":
          weatherIcon.src = "wimages/mist.png";
          break;
        case "Mist":
          weatherIcon.src = "wimages/snow.png";
          break;
      }

      showWeather();
    }
  } catch (error) {
    showError();
  } finally {
    hideLoader();
  }
}

function clearOutput() {
  searchBox.value = "";
  weatherContainer.style.display = "none";
  errorMessage.style.display = "none";
  hideLoader();
}

function showWeather() {
  weatherContainer.style.display = "block";
  errorMessage.style.display = "none";
}

function showError() {
  weatherContainer.style.display = "none";
  errorMessage.style.display = "block";
}

function showLoader() {
  loader.style.display = "block";
  weatherContainer.style.display = "none";
  errorMessage.style.display = "none";
}

function hideLoader() {
  loader.style.display = "none";
}

// Search on button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Search on Enter key press
searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

// Clear button
clearBtn.addEventListener("click", () => {
  clearOutput();
});
