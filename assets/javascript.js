// API key: 9efcb564494f2e20b99f73f7925ec30e

// Search function calls the weather API

var searchApi = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=9efcb564494f2e20b99f73f7925ec30e`

var searchInput = document.getElementById('search-box').value;

document.getElementById('search-button').addEventListener('click', function() {
    console.log("Search Button Clicked!")
});