

const apiKey = "8f381c9164cd41aeb2b211810251308";
 /*Minha chave de acesso ao WeatherAPI, é necessario para autenticar as requisições.*/
const initialCity = "Arapiraca"; 
 /*Cidade padrão que o app vai mostrar quando abrir (Arapiraca no caso).*/


/*Aqui eu conecto o JavaScript ao HTML pegando os elementos pelo id.*/
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

/*Isso permite que eu possa alterar o conteúdo e exibir informações vinda da API*/
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

/*função assíncrona porque usarei o await para esperar a respota da API*/
async function getWeather(city) {

    if (!city) {
        errorMessage.innerText = "Por favor, insira o nome de uma cidade.";
        weatherResult.classList.add("hidden");
        errorMessage.classList.remove("hidden");
        return;
        /*Aqui mostra uma menssagem de erro caso o usuário não digite nada, também não chama a API*/
    }

    try { /*apikey: minha chave / city: cidade digitada / lang=pt: resposta em portugues br / aqi=no: sem dados de qualidade do ar*/
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`;
        const response = await fetch(url); /*fecht(url): faz a chamada HTTP / await: espera a resposta da API*/


        if (!response.ok) {
            throw new Error("Não foi possível encontrar essa cidade. Verifique o nome e tente novamente.");
        }/*Se a API responder com erro, lança uma exerção para ser tratada no catch*/

        const data = await response.json();
        /*converte JSON em objeto JavaScript*/

        cityName.innerText = `${data.location.name} - ${data.location.country}`;
        let [ano, mes, dia] = data.location.localtime.split(" ")[0].split("-");
        let hora = data.location.localtime.split(" ")[1];
        localTime.innerText = `Horário Local: ${dia}/${mes}/${ano} ${hora}`;
        weatherIcon.src = data.current.condition.icon;
        temperature.innerText = `${data.current.temp_c}°C`;
        condition.innerText = data.current.condition.text;
        feelsLike.innerText = `${data.current.feelslike_c}°C`;
        humidity.innerText = `${data.current.humidity}%`;
        windSpeed.innerText = `${data.current.wind_kph} km/h`;
        pressure.innerText = `${data.current.pressure_mb} hPa`;
        visibility.innerText = `${data.current.vis_km} km`;
        uvIndex.innerText = data.current.uv;
        /*pega os dados vindos da API e coloca dentro dos elementos HTML para o user ver...*/
 
        weatherResult.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        /*Exibi a caixa de informações e esconde a menssagem de erro*/
    } catch (error) {
      /*Se algo deu ruim, esconde os dados e aparece a menssagem de erro*/
        errorMessage.innerText = error.message;
        weatherResult.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
}


searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    getWeather(city);
});/*Quando clica no botão de busca, pega o texto do campo, remove espaços extra  e chama o getWeather()*/


cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});/*Permite buscar o clima apertando Enter*/


getWeather(initialCity);/*Quando a página carrega,já mostra o clima da cidadeinicial (Arapirca)*/