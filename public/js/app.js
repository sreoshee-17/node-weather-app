var weatherApi = "/weather";
const weatherForm = document.querySelector('form'); 
const search = document.querySelector('input');
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');
const frontImage = document.querySelector('.front-image');

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    locationElement.textContent = "Loading...";
    weatherIcon.className = "";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    frontImage.style.display = "none";

    showData(search.value);
});

function showData(city) {
    getWeatherData(city, (result) => {
        if (result.cod == 200) {
            if (result.weather[0].description == "rain" ||
                result.weather[0].description == "fog") {
                weatherIcon.className = "wi wi-day-" + result.weather[0].description;
            } else {
                weatherIcon.className = "wi wi-day-cloudy";
            }
            locationElement.textContent = result?.name;
            tempElement.textContent = (result?.main?.temp - 273.5).toFixed(2) + String.fromCharCode(176);
            weatherCondition.textContent = result?.weather[0]?.description?.toUpperCase();
            const currentDate = new Date();
            const options = { month: "long" };
            const monthName = currentDate.toLocaleString("en-US", options);
            dateElement.textContent = monthName + ", " + currentDate.getDate();
        } else {
            locationElement.textContent = "City Not Found!";
            frontImage.style.display = "block";
        }
    });
}

function getWeatherData(city, callback) {
    const locationApi = weatherApi + "?address=" + city;
    fetch(locationApi).then((response) => {
        response.json().then((response) => {
            callback(response);
        });
    });
}
