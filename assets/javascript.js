// API key: 9efcb564494f2e20b99f73f7925ec30e

// Search function calls the weather API

document.getElementById('search-button').addEventListener('click', function() {
    var searchInput = document.getElementById('search-box').value;
    console.log(searchInput);

    var searchApi = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=9efcb564494f2e20b99f73f7925ec30e`;

    var lat, lon;

    fetch(searchApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        });

        var weatherApi = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9efcb564494f2e20b99f73f7925ec30e`;

    fetch (weatherApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })

});