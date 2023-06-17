// API key: 9efcb564494f2e20b99f73f7925ec30e

// Search function calls the weather API

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
document.getElementById("today").textContent = '(' + today + ')';

function getWeather(city) {
    var searchApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=9efcb564494f2e20b99f73f7925ec30e`;

    fetch(searchApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(`Latitude: ${lat}, Longitude: ${lon}`);


            // var weatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9efcb564494f2e20b99f73f7925ec30e`;

            var weatherApi = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=9efcb564494f2e20b99f73f7925ec30e`

            fetch(weatherApi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (weatherData) {
                    console.log(weatherData);
                    displayWeather(weatherData);
                    displayForecast(weatherData);
                })
        })
}

function displayWeather(data) {
    // pull current temp, wind, humidity into HTML
    var tempF = (((data.current.temp - 273.15) * 9 / 5) + 32).toFixed(0);
    var iconCode = data.current.weather[0].icon
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

    document.getElementById("current-temp").textContent = "Temp: " + tempF + " °F";
    document.getElementById("current-wind").textContent = "Wind: " + data.current.wind_speed + " MPH";
    document.getElementById("current-humidity").textContent = "Humidity: " + data.current.humidity + "%";
    document.getElementById("wicon").style.display = 'inline';
    document.getElementById("wicon").setAttribute('src', iconUrl);
};

function displayForecast(data) {
    // figuring out 5-day forecast values

    var fdf = document.getElementById("forecast-cards");

        for (i=1; i<6; i++) {
            var day1UTC = data.daily[i].dt;
            var day1 = new Date(day1UTC * 1000);
            var dd = String(day1.getUTCDate());
            var mm = String(day1.getUTCMonth() + 1);
            var yyyy = day1.getUTCFullYear();
            var day1Print = mm + '/' + dd + '/' + yyyy;
            var day1TempMax = (((data.daily[i].temp.max - 273.15) * 9 / 5) + 32).toFixed(0);
            var day1TempMin = (((data.daily[i].temp.min - 273.15) * 9 / 5) + 32).toFixed(0);
            var icon1Code = data.daily[i].weather[0].icon;
            var icon1Url = "http://openweathermap.org/img/w/" + icon1Code + ".png";
            var day1Wind = data.daily[i].wind_speed;
            var day1Humidity = data.daily[i].humidity;
            
            var fdfCards = `
            <div class='column is-size-6'>
                <p>${day1Print}</p>
                <img src='${icon1Url}'>
                <p>High: ${day1TempMax} °F</p>
                <p>Low: ${day1TempMin} °F</p>
                <p>Wind: ${day1Wind} MPH</p>
                <p>Humidity: ${day1Humidity}%</p>
            </div>
            `
                    fdf.insertAdjacentHTML('beforeend', fdfCards)
        };
};

function addhistoryButton(city) {
    var pastSearches = document.getElementById('past-searches')

    pastSearches.insertAdjacentHTML('beforeend', `
    <button class='button past-search-button has-background-primary-light has-text-dark'>${city}</button>
    `)
}


document.getElementById('search-button').addEventListener('click', function () {
    var searchInput = document.getElementById('search-box').value;
    console.log(searchInput);

    getWeather(searchInput);

    document.getElementById("city").textContent = searchInput + ' ';

    localStorage.setItem('city', searchInput);

    var pastCity = localStorage.getItem('city');

    addhistoryButton(pastCity);
});