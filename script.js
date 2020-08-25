
var getSearchHistory = localStorage.getItem("locations");
getSearchHistory = JSON.parse(getSearchHistory);

if (getSearchHistory === null) {
    getSearchHistory = [];
}

var mostRecentSearch = getSearchHistory[getSearchHistory.length - 1];
getItem(getSearchHistory[getSearchHistory.length - 1]);

for (var i = 0; i < getSearchHistory.length; i++) {
    var pastSearchListItem = $("<li>");
    pastSearchListItem.addClass("list-group-item pastCity");
    pastSearchListItem.text(getSearchHistory[i]);
    $(".list-group").prepend(pastSearchListItem);
};


$(".btn").on("click", function () {
    var newSearch = $(".form-control").val().trim();
    getSearchHistory.push(newSearch);
    localStorage.setItem("locations", JSON.stringify(getSearchHistory));

    var pastSearchListItem = $("<li>");
    pastSearchListItem.addClass("list-group-item pastCity");
    pastSearchListItem.text(newSearch);
    $(".list-group").prepend(pastSearchListItem);

    getItem(getSearchHistory[getSearchHistory.length - 1]);

});

$(document).on("click", ".pastCity", function () {
    getItem($(this).text())
})


function getItem(mostRecentSearch) {
    $(".currentConditions").empty();
    $(".futureDayCard").empty();


    // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + mostRecentSearch + "&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {


            var currentWeatherDiv = $("<div>");
            var currentCityHeaderDiv = $("<h4>");
            var currentTempDiv = $("<p>");
            var currentHumidityDiv = $("<p>");
            var currentWindDiv = $("<p>");
            var currentCityName = response.name;
            var currentDate = moment().format(" (M/DD/YYYY)");
            var currentWeatherIconImgDiv = $("<img>");
            var currentWeatherIconImgCode = response.weather[0].icon
            var currentWeatherIconImgSrc = "https://openweathermap.org/img/wn/" + currentWeatherIconImgCode + "@2x.png";
            var currentTemp = Math.round((response.main.temp) * 10) / 10;
            var currentHumidity = response.main.humidity;
            var currentWindSpeed = Math.round((response.wind.speed) * 10) / 10;
            var longitute = response.coord.lon;
            var latitude = response.coord.lat;
            currentCityHeaderDiv.append(currentCityName);
            currentCityHeaderDiv.append(currentDate);
            currentWeatherIconImgDiv.attr("src", currentWeatherIconImgSrc);
            currentCityHeaderDiv.append(currentWeatherIconImgDiv);
            currentWeatherDiv.append(currentCityHeaderDiv);
            currentTempDiv.text("Temperature: " + currentTemp + " °F");
            currentHumidityDiv.text("Humidity: " + currentHumidity + "%");
            currentWindDiv.text("Wind Speed: " + currentWindSpeed + " MPH");

            currentWeatherDiv.append(currentTempDiv);
            currentWeatherDiv.append(currentHumidityDiv);
            currentWeatherDiv.append(currentWindDiv);

            $(".currentConditions").append(currentWeatherDiv);

            var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitute;

            $.ajax({
                url: queryURL2,
                method: "GET"
            })
                // We store all of the retrieved data inside of an object called "response"
                .then(function (response) {
                    // console.log(response);
                    var uvDiv = $("<p>");
                    var uvIndex = response.value;
                    uvDiv.html("UV Index: " + uvIndex);
                    currentWeatherDiv.append(uvDiv);



                    // find uv index
                });
            $(".currentConditions").append(currentWeatherDiv);

            var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitute + "&units=imperial";


            $.ajax({
                url: queryURL3,
                method: "GET"
            })

                .then(function (response) {
                    for (var i = 0; i < 5; i++) {
                        var futureDate = moment().add(i + 1, 'days').format("M/DD/YYYY");

                        var futureWeatherDiv = $("<div>");
                        var futureDateDiv = $("<h6>");
                        var futureWeatherIconImgDiv = $("<img>");
                        var futureWeatherIconImgCode = response.list[i + 1].weather[0].icon;
                        var futureWeatherIconImgSrc = "https://openweathermap.org/img/wn/" + futureWeatherIconImgCode + ".png";
                        var futureTempDiv = $("<p>");
                        var futureTemp = Math.round((response.list[i + 1].main.temp) * 10) / 10;
                        var futureHumidityDiv = $("<p>");
                        var futureHumidity = response.list[i + 1].main.humidity;


                        futureDateDiv.text(futureDate);
                        futureWeatherIconImgDiv.attr("src", futureWeatherIconImgSrc);
                        futureTempDiv.text("Temp: " + futureTemp + " °F");
                        futureHumidityDiv.text("Humidity: " + futureHumidity + "%");


                        futureWeatherDiv.append(futureDateDiv);
                        futureWeatherDiv.append(futureWeatherIconImgDiv);
                        futureWeatherDiv.append(futureTempDiv);
                        futureWeatherDiv.append(futureHumidityDiv);

                        $("#day" + (i + 1)).append(futureWeatherDiv);
                    }


                });
        });

};



