var fs = require("fs");
var request = require("request");
require("dotenv").config();
var Twitter = require('twitter');
var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Grab the argument
var commandIn = process.argv[2];

if (commandIn === "my-tweets") {
    this.findShow = function (show) {
        var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;

        request(URL, function (err, response, body) {
            // parse the response body (string) to a JSON object
            var jsonData = JSON.parse(body);

            // showData ends up being the string containing the show data we will print to the console
            var showData = [
                "\nShow: " + jsonData.name,
                "Genre(s): " + jsonData.genres.join(", "),
                "Rating: " + jsonData.rating.average,
                "Network: " + jsonData.network.name,
                "Summary: " + jsonData.summary
            ].join("\n\n");

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw err;
                console.log(showData);
            });
        });
    };
} else if (commandIn === "spotify-this-song") {

} else if (commandIn === "movie-this") {

} else if (commandIn === "do-what-it-says") {

}

