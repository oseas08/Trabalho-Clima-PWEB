

const apiKey = "8f381c9164cd41aeb2b211810251308"; 
const initialCity = "Arapiraca"; 


const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

const cityName = document.getElementById("city-name");
const localTime = document.getElementById("local-time");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const uvIndex = document.getElementById("uv-index");

async function getWeather(city) {

    if (!city) {
        errorMessage.innerText = "Por favor, insira o nome de uma cidade.";
        weatherResult.classList.add("hidden");
        errorMessage.classList.remove("hidden");
        return;
    }

    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`;
        const response = await fetch(url);


        if (!response.ok) {
            throw new Error("Não foi possível encontrar essa cidade. Verifique o nome e tente novamente.");
        }

        const data = await response.json();
        

        cityName.innerText = `${data.location.name} - ${data.location.country}`;
        localTime.innerText = `Horário Local: ${data.location.localtime}`;
        weatherIcon.src = data.current.condition.icon;
        temperature.innerText = `${data.current.temp_c}°C`;
        condition.innerText = data.current.condition.text;
        feelsLike.innerText = `${data.current.feelslike_c}°C`;
        humidity.innerText = `${data.current.humidity}%`;
        windSpeed.innerText = `${data.current.wind_kph} km/h`;
        pressure.innerText = `${data.current.pressure_mb} hPa`;
        visibility.innerText = `${data.current.vis_km} km`;
        uvIndex.innerText = data.current.uv;

 
        weatherResult.classList.remove("hidden");
        errorMessage.classList.add("hidden");

    } catch (error) {
      
        errorMessage.innerText = error.message;
        weatherResult.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
}


searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    getWeather(city);
});


cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});


getWeather(initialCity);