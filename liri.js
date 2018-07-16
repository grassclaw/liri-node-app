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
            console.log("Retreiving spotify information for the song " + nameInput + "...");
            getSongInfo(nameInput);
            break;
        // Calls function to get info from IMBD
        case "movie-this":
            console.log("Retreiving IMBD information for the movie " + nameInput + "...");
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
            var outputStr = '------------------------\n' + 'User Tweets:\n' + '------------------------\n\n';
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




// HAVING TOKEN ISSUES.....
// Function to showinfo on specified song from spotify api
function getSongInfo(nameInput) {
    //sets parameters for the tweet 
    if (nameInput === '') {
		nameInput = 'The Sign Ace Of Base';
	}
    spotify.search({ type: 'track', query: nameInput }, function (error, data) {
        console.log(data.tracks);
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                //artist
                console.log("Artist: " + songData.artists[0].name);
                //song name
                console.log("Song: " + songData.name);
                //spotify preview link
                console.log("Preview URL: " + songData.preview_url);
                //album name
                console.log("Album: " + songData.album.name);
                console.log("-----------------------");

                //adds text to random.txt
                fs.appendFile('random.txt', songData.artists[0].name);
                fs.appendFile('random.txt', songData.name);
                fs.appendFile('random.txt', songData.preview_url);
                fs.appendFile('random.txt', songData.album.name);
                fs.appendFile('random.txt', "-----------------------");
            }
        } else {
            console.log('Error occurred.');
        }
    });
};

function getMovieInfo(movieTitle) {

	// Runs a request to the OMDB API with the movie specified.
	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&tomatoes=true&r=json";

	request(queryUrl, function(error, response, body) {
	  // If the request is successful...
	  if (!error && response.statusCode === 200) {
	    
	    // Parses the body of the site and recovers movie info.
	    var movie = JSON.parse(body);

	    // Prints out movie info.
	    logOutput("Movie Title: " + movie.Title);
	    logOutput("Release Year: " + movie.Year);
	    logOutput("IMDB Rating: " + movie.imdbRating);
	    logOutput("Country Produced In: " + movie.Country);
	    logOutput("Language: " + movie.Language);
	    logOutput("Plot: " + movie.Plot);
	    logOutput("Actors: " + movie.Actors);

	    // Had to set to array value, as there seems to be a bug in API response,
	    // that always returns N/A for movie.tomatoRating.
	    logOutput("Rotten Tomatoes Rating: " + movie.Ratings[2].Value);
	    logOutput("Rotten Tomatoes URL: " + movie.tomatoURL);
	  }
	});
}

// Uses fs node package to take the text inside random.txt,
// and do something with it.
function doWhatItSays() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {

			// Creates array with data.
			var randomArray = data.split(",");

			// Sets action to first item in array.
			action = randomArray[0];

			// Sets optional third argument to second item in array.
			argument = randomArray[1];

			// Calls main controller to do something based on action and argument.
			doSomething(action, argument);
		}
	});
}
