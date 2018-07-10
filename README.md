# liri-node-app

liri-node-app

LIRI is a Language Interpretation and Recognition Interface.
It takes in an action request and an optional argument,
such as a movie-title, both using node's process.argv.
Action requests include retrieving tweets from Twitter API,
song information from Spotify API, and movie information from OMDB.
LIRI also calls out to a random text file that can include any action or argument.
LIRI includes logging support both to the console and an output file, log.txt.
It uses the npm node module, 'simple-node-logger', for it's logging solution.
