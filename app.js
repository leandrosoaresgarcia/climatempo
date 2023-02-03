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

navigator.geolocation.getCurrentPosition (
    (position) => {

        let lat = position.coords.latitude
        let lon = position.coords.longitude

        getCurrentLocationWeather(lat, lon)
        
    },
    (err) => {
        if (err.code === 1) {
            alert("Geolocalização negada pelo usuário, busque manualmente por uma cidade através da barra de pesquisa.")
        } else {
            console.log(err)
        }
    }
)

function getCurrentLocationWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
}

function getCityWeather(cityName) {

    weatherIcon.src = `assets/loading-icon.svg` 

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

    dateName.textContent = formatDate(dt);
    cityName.textContent = name;
    weatherIcon.src = `assets/${icon}.svg` 
    weatherInfo.textContent = description;
    degrees.textContent = `${Math.round(temp)}°C`;
    wind.textContent = `${Math.round(speed * 3.6)}Km`;
    sensation.textContent = `${Math.round(feels_like)}°C`;
    humidity.textContent = `${humidity}%`;
    sunrise.textContent = sunrise;
    sunset.textContent = sunset;
}

function formatDate (epochTime) {
    let date = new Date(epochTime * 1000)
    let formattedDate = date.tolocaleDateString('pt-BR', { month: "long", day: 'numeric' })
    return `Hoje, ${formattedDate}` 
}

function formatTime(epochTime) {
    let date = new Date(epochTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours}:${minutes}`
}
