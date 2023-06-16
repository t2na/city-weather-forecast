// API key: 9efcb564494f2e20b99f73f7925ec30e

// Search function calls the weather API

document.addEventListener("DOMContentLoaded", function() {

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
document.getElementById("today").textContent = '(' + today + ')';


document.getElementById('search-button').addEventListener('click', function() {
    var searchInput = document.getElementById('search-box').value;
    console.log(searchInput);

    document.getElementById("city").textContent = searchInput + ' ';

    var searchApi = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=9efcb564494f2e20b99f73f7925ec30e`;

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

        fetch (weatherApi)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                // pull current temp, wind, humidity into HTML
                var tempF = (((data.current.temp - 273.15)*9/5) + 32).toFixed(0);
                var iconCode = data.current.weather[0].icon
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                document.getElementById("current-temp").textContent = "Temp: " + tempF + " °F";
                document.getElementById("current-wind").textContent = "Wind: " + data.current.wind_speed + " MPH";
                document.getElementById("current-humidity").textContent = "Humidity: " + data.current.humidity + "%";
                document.getElementById("wicon").style.display = 'inline';
                document.getElementById("wicon").setAttribute('src',iconUrl);
            
            })
        });
});

});