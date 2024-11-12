const request = require('request'); // needed to fetch the third party API

const openWeatherMap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=", // fixed typo in API URL
    SECRET_KEY: "3b9126c6842b190e9cec1fa3e3b50549",
};

const weatherData = (address, callback) => {
    const url = openWeatherMap.BASE_URL + encodeURIComponent(address) + "&APPID=" + openWeatherMap.SECRET_KEY;
    console.log(url);

    request({ url, json: true }, (error, response) => {
        if (error) {
            return callback(true, "Unable to fetch data, please try again.");
        } else if (response && response.statusCode !== 200) {
            // Handle non-200 responses
            return callback(true, `Error: ${response.body?.message || 'Unknown error'}`);
        }
        callback(false, response.body);
    });
};

module.exports = weatherData;
