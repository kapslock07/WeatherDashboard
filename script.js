// This is our API key
var APIKey = "166a433c57516f51dfab1f7edaed8413";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=West Orange, New Jersey&units=imperial&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
})
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);
        console.log(response.name);
        console.log(moment().format("M/DD/YYYY"));
        console.log(response.weather[0].icon);

        var currentWeatherDiv = $("<div>");
        var currentCityHeaderDiv = $("<h4>");
        var tempDiv = $("<p>");
        var humidityDiv = $("<p>");
        var windDiv = $("<p>");
        var currentCityName = response.name;
        var currentDate = moment().format(" (M/DD/YYYY)");
        var currentWeatherIconImgDiv = $("<img>");
        var currentWeatherIconImgCode = response.weather[0].icon
        var currentWeatherIconImgSrc = "http://openweathermap.org/img/wn/" + currentWeatherIconImgCode + "@2x.png";
        var currentTemp = Math.round((response.main.temp) * 10) / 10;
        var currentHumidity = response.main.humidity;
        var currentWindSpeed = Math.round((response.wind.speed) * 10) / 10;

        currentCityHeaderDiv.append(currentCityName);
        currentCityHeaderDiv.append(currentDate);
        currentWeatherIconImgDiv.attr("src", currentWeatherIconImgSrc);
        currentCityHeaderDiv.append(currentWeatherIconImgDiv);
        currentWeatherDiv.append(currentCityHeaderDiv);
        tempDiv.text("Temperature: " + currentTemp + " °F");
        humidityDiv.text("Humidity: " + currentHumidity + "%");
        windDiv.text("Wind Speed: " + currentWindSpeed + " MPH");

        currentWeatherDiv.append(tempDiv);
        currentWeatherDiv.append(humidityDiv);
        currentWeatherDiv.append(windDiv);

        $(".currentConditions").append(currentWeatherDiv);

    });