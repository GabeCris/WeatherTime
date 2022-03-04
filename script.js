const api = {
    key: "c4687b01151c282d30a1e50ddb860b79",
    base: "https://api.openweathermap.org/data/2.5/weather",
    lang: "pt_br",
    units: "metric",
};

const front = document.querySelector(".front");
const containerFlip = document.querySelector(".container-flip");
const container = document.querySelector(".container");
const loadingContainer = document.querySelector(".loading");
const flip = document.querySelector(".flip");
const description = document.querySelector(".weather-description");
const temperature = document.querySelector(".temperature");
const city = document.querySelector(".city");
const inputSearch = document.querySelector(".new-local");
const buttonSearch = document.querySelector(".search");
const weatherLogoContainer = document.querySelector(".weather-icon");
const header = document.getElementById("header");

const initialize=()=>{
    searchLocal('Brasília');
    setDate();
}

const loading = () => {
    containerFlip.classList.toggle("rotate");
    setTimeout(() => {
        containerFlip.classList.toggle("rotate");
    }, 1500);
};

const newLocal = () => {
    hideShowHeader();
    inputSearch.focus();
    flip.classList.toggle("rotate");
    setTimeout(() => {
        front.classList.toggle("hide");
    }, 600);
};

const hideShowHeader = () => {
    console.log("entruo no hide");
    header.classList.toggle("hide-header");
};

const cancelSearch = () => {
    inputSearch.value = "";
    hideShowHeader();
    flip.classList.toggle("rotate");
    front.classList.toggle("hide");
};

let valorHour = document.getElementById("hour");

const validationHour = () => {
    let hour = document.getElementById("hour");
    if (valorHour.value > 24 || valorHour.value < 1 || valorHour.value == "") {
        console.log("error");
        hour.classList.add("error");
        return false;
    } else {
        hour.classList.remove("error");
        return true;
    }
};

const validationLocal = () => {
    if (inputSearch.value == "") {
        inputSearch.classList.add("error");
        return false;
    } else {
        inputSearch.classList.remove("error");
        return true;
    }
};

const search = () => {
    if (validationHour() && validationLocal()) {
        setTimeout(setBackground(), 1000);
        searchLocal(inputSearch.value);
        loading();
        hourSet();
        setDate();
        hideShowHeader();
        flip.classList.toggle("rotate");
        front.classList.toggle("hide");
    }
};

const hourSet = () => {
    const hourSet = document.querySelector(".hour-set");
    hourSet.innerHTML = `${valorHour.value}:00h`;
};

const setDate = () => {
    const now = new Date();
    const date = document.querySelector(".date");

    console.log(`HOJE É DIA ${now.getDay()} do mês ${now.getMonth() + 1}`);

    date.innerHTML = `${
        now.getDay() < 10 ? "0" + now.getDay() : now.getDay()
    } / ${
        now.getMonth() + 1 < 10
            ? "0" + (now.getMonth() + 1)
            : now.getMonth() + 1
    }`;
};

const searchLocal = (city) => {
    console.log(city);
    fetch(
        `${api.base}?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            // alert(error.message);
        })
        .then((response) => {
            showWeather(response);
        });
};

const showWeather = (weather) => {
    console.log(weather);

    city.innerText = `${weather.name} - ${weather.sys.country}`;

    let icon = weather.weather[0].icon;
    console.log(icon);
    weatherLogoContainer.innerHTML = `<img src="/img/icons/${icon}.svg">`;

    inputSearch.value = "";
    let temp = `${Math.round(weather.main.temp)}`;
    temperature.innerHTML = `${temp} °C`;

    weather_tempo = weather.weather[0].description;
    console.log(weather_tempo);
    description.innerText = capitalizeFirstLetter(weather_tempo);
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const setBackground = () => {
    console.log("ENTROU NO SET BACKGROUND");
    console.log("VALOR DO HOUR" + valorHour.value);
    if (valorHour.value <= 5 || valorHour.value >= 20) {
        console.log("ENTROU NIGHT");
        removeBg();
        container.classList.add("background-night");
        loadingContainer.classList.add("background-night");
    }
    if (valorHour.value > 5 && valorHour.value <= 16) {
        console.log("ENTROU DAY");
        removeBg();
        container.classList.add("background-day");
        loadingContainer.classList.add("background-day");
    }
    if (valorHour.value > 16 && valorHour.value <= 19) {
        console.log("ENTROU DUSK");
        removeBg();
        container.classList.add("background-dusk");
        loadingContainer.classList.add("background-dusk");
    }
};

const removeBg = () => {
    console.log("remove tudo");
    container.classList.remove("background-night");
    container.classList.remove("background-day");
    container.classList.remove("background-dusk");
    loadingContainer.classList.remove("background-night");
    loadingContainer.classList.remove("background-day");
    loadingContainer.classList.remove("background-dusk");
};
