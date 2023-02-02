// Interação variáveis
const citySearchInput = document.getElementById("city-search-input");
const citySearchButton = document.getElementById("city-search-button");

// Exibição variáveis
const dateName = document.getElementById("date");
const cityName = document.getElementById("cityname");
const weatherIcon = document.getElementById("weather_icon");
const weatherInfo = document.getElementById("weatherinfo");
const degrees = document.getElementById("degrees");
const wind = document.getElementById("wind");
const sensation = document.getElementById("sensation");
const humidity = document.getElementById("humidity");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const api_key = "e0c5a63b4949896b795fd59370ae7fb9";


// interação funções
citySearchButton.addEventListener("click", () => {
    let cityName = citySearchInput.value
    getCityWeather(cityName)
})

function getCityWeather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
}


// exibição funções
function displayWeather(data) {
    let {
        dt,
        name,
        weather: [{ icon, description }],
        main: [{ temp, feels_like, humidity }],
        wind: [{ speed }],
        sys: [{ sunrise, sunset }],
    } = data

    dateName.textContent = dt;
    cityName.textContent = name;
    
    weatherInfo.textContent = description;
    degrees.textContent = temp;
    wind.textContent = speed;
    sensation.textContent = feels_like;
    humidity.textContent = humidity;
    sunrise.textContent = sunrise;
    sunset.textContent = sunset;
}
