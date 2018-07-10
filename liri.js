// read and set environmental variable
require("dotenv").config();
// NPM module used to read/append text file
var fs = require("fs");
// NPM module used to access IMBD information
var request = require("request");
// NPM tiwitter module call
var Twitter = require('twitter');
// NPM module used to access Spotify API.
var spotify = require("spotify");
// used to acces twitter and spotify keys
var keys = require("./keys");

// Grab the argument command and additional information
var commandIn = process.argv[2];
var nameInput = process.argv.slice(3).join(" "); //stores all remaining arguments into an array

// This function determines what action to take. It is the controller
commandTrigger(commandIn, nameInput);

// Switch operation used to determin which action to take.
function commandTrigger(commandIn, nameInput) {
    switch (commandIn) {
        // calls function to get tweets
        case "my-tweets":
            console.log("Retreiving last twenty tweets for @DraKodeus...");
            getMyTweets();
            break;
        // calls function to get spotify info
        case "spotify-this-song":
            console.log("Retreiving spotify information for the song " + nameInput);
            getSongInfo(nameInput);
            break;
        // Calls function to get info from IMBD
        case "movie-this":
            console.log("Retreiving IMBD information for the movie " + nameInput);
            getMovieInfo(nameInput);
            break;
        // Gets text inside file, and uses it to do something.
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}
// Function to show my last 20 tweets.
function getMyTweets() {
    // access keys information
    var client = new Twitter(keys.twitter);

    //sets parameters for the tweet 
    var params = { q: 'DraKodeus', count: 20 };

    // Shows up to last 20 tweets and whenthe tweets were created
    client.get('search/tweets', params, function (error, tweets, response) {
        if (!error) {
            // For formatting purposes
            var outputStr = '------------------------\n' + 'User Tweets:\n' +'------------------------\n\n';
            // Loops through tweets and prints out tweet text and the creation date
            for (var i = 0; i < tweets.statuses.length; i++) {
                outputStr += 'Created on: ' + tweets.statuses[i].created_at + '\n' +
                    'Tweet content: ' + tweets.statuses[i].text + '\n' +
                    '------------------------\n';
            }
            // Append the output to the log file
            fs.appendFile('./random.txt', 'User Command: node liri.js my-tweets\n\n LIRI Response:\n\n' + outputStr + '\n', (err) => {
                if (err) throw err;
                console.log(outputStr);
            }); 
        } else {
            console.log(error);
        }
    });
}
// Function to showinfo on specified song from spotify api
function getSongInfo(nameInput){
    //sets parameters for the tweet 
    var params = { q: 'DraKodeus', count: 20 };

    // Shows up to last 20 tweets and whenthe tweets were created
    client.get('search/tweets', params, function (error, tweets, response) {
        if (!error) {
            // For formatting purposes
            var outputStr = '------------------------\n' + 'User Tweets:\n' +'------------------------\n\n';
            // Loops through tweets and prints out tweet text and the creation date
            for (var i = 0; i < tweets.statuses.length; i++) {
                outputStr += 'Created on: ' + tweets.statuses[i].created_at + '\n' +
                    'Tweet content: ' + tweets.statuses[i].text + '\n' +
                    '------------------------\n';
            }
            // Append the output to the log file
            fs.appendFile('./random.txt', 'User Command: node liri.js my-tweets\n\n LIRI Response:\n\n' + outputStr + '\n', (err) => {
                if (err) throw err;
                console.log(outputStr);
            }); 
        } else {
            console.log(error);
        }
    });
}
    // request(URL, function (err, response, body) {
    //     // parse the response body (string) to a JSON object
    //     var jsonData = JSON.parse(body);

    //     // showData ends up being the string containing the show data we will print to the console
    //     var showData = [
    //         "\nShow: " + jsonData.name,
    //         "Genre(s): " + jsonData.genres.join(", "),
    //         "Rating: " + jsonData.rating.average,
    //         "Network: " + jsonData.network.name,
    //         "Summary: " + jsonData.summary
    //     ].join("\n\n");

    //     // Append showData and the divider to log.txt, print showData to the console
    //     fs.appendFile("log.txt", showData + divider, function (err) {
    //         if (err) throw err;
    //         console.log(showData);
    //     });
    // });


