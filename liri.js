//Spotify API elements
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Node Modules
var request = require('request');
var fs = require('fs');
var moment = require('moment');
var inquirer = require("inquirer");

//Welcome message
console.log("Hi, welcome to Adrian's Awesome LIRI");
// User will select what he wishes to do with the Liri app
var choices = [{
    type: "list",
    name: "choice",
    message: "What do you want to search?",
    //choices: ["Concerts of Favorite Bands", "Search for Spotify Song", "Search for a Movie", "Do what it says"],
    choices: [{
            key: "c",
            name: "Concerts of Favorite Bands",
            value: "concert"
        },
        {
            key: "s",
            name: "Search for Spotify Song",
            value: "spot"
        },
        {
            key: "m",
            name: "Search for a Movie",
            value: "movie"
        },
        {
            key: "d",
            name: "Do what it says",
            value: "default"
        }
    ],

    filter: function (val) {
        return val.toLowerCase();
    }
}, ];

inquirer.prompt(choices).then(answers => {

    //Condition to choose the next question
    switch (answers.choice) {
        case "concert":
            concertFunction();
            break;
        case "spot":
            spotFunction();
            break;
        case "movie":
            movieFunction();
            break;
        case "default":
            defaultFunction();
            break;
        default:
            console.log("Something went wrong, please try again");
            break;
    }
});

// 3 functions for next question execution:

function concertFunction() {
    var concert = [{
        type: "input",
        name: "term",
        message: "Please choose your band",
        default: "The Killers"
    }, ];

    inquirer.prompt(concert).then(answers => {
        searchConcert(answers.term);
    });
}

function spotFunction() {
    var spot = [{
        type: "input",
        name: "term",
        message: "Please choose your song",
        default: "The Sign"
    }, ];

    inquirer.prompt(spot).then(answers => {
        searchSpotify(answers.term);
    });
}

function movieFunction() {
    var movie = [{
        type: "input",
        name: "term",
        message: "Please choose your movie",
        default: "Mr. Nobody"
    }, ];
    inquirer.prompt(movie).then(answers => {
        searchMovie(answers.term);
    });
}

// Function to search for a concert:
function searchConcert(concertInput) {
    console.log("Look for concert: " + concertInput + "\n Please wait a few seconds...");
    console.log("-----------------------------------");

    var queryUrl = "https://rest.bandsintown.com/artists/" + concertInput + "/events?app_id=codingbootcamp";

    request(queryUrl, function (error, response, data) {
        if (!error && response.statusCode === 200) {
            var concert = JSON.parse(data);
            console.log("Results of upcoming concerts for " + concertInput + ":");
            console.log("LIRI Found " + concert.length + " concert dates!");

            for (var i = 0; i < concert.length; i++) {
                var date = concert[i].datetime;
                date = moment(date).format("DD MMMM YYYY");
                var concertNumber = i + 1;
                console.log("\nConcert Number: " + concertNumber);
                console.log("Date: " + date);
                if (concert[i].venue.region == "") {
                    console.log("Location: " + concert[i].venue.city + ", " + concert[i].venue.country);
                } else {
                    console.log("Location: " + concert[i].venue.city + ", " + concert[i].venue.region + ", " + concert[i].venue.country);
                }
                console.log("Venue: " + concert[i].venue.name);
            }
            console.log("-----------------------------------");
        }
    });
}

// Function to search for a song:
function searchSpotify(songName) {
    console.log("Looking for song: " + songName + "\n Please wait a few seconds...");

    spotify.search({
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;
            console.log("\nLIRI Found " + songs.length + " songs:");
            console.log("-----------------------------------");

            for (var i = 0; i < songs.length; i++) {

                var songNumber = i + 1;
                console.log("Song Number: " + songNumber);
                console.log("Artist: " + songs[i].artists[0].name);
                console.log("Song: " + songs[i].name);
                console.log("Album: " + songs[i].album.name);
                console.log("Preview: " + songs[i].preview_url);
                console.log("\n---------------------------------");
            }
        }
    );
}

// Function to search for a movie:
function searchMovie(movieName) {
    console.log("Looking for movie: " + movieName + "\n Please wait a few seconds...");

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var data = JSON.parse(body);

            for (i = 0; i < data.Ratings.length; i++) {
                if (data.Ratings[i].Source === "Rotten Tomatoes") {
                    tomatometer = data.Ratings[i].Value;
                }
                if (data.Ratings[i].Source === "Internet Movie Database") {
                    imdbRating = data.Ratings[i].Value;
                }
            }

            console.log("--------------------------------");
            console.log("Title: " + data.Title);
            console.log("Release Year: " + data.Year);
            console.log("IMDB Rating: " + imdbRating);
            console.log("Tomatometer: " + tomatometer);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            console.log("--------------------------------");

        } else {
            console.log("An error has occurred, please try again!\n")
        }
    });
}

//do what it says function
function defaultFunction() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        dataSplit = data.split(",")
        selectedSong = dataSplit[1];
        searchSpotify(selectedSong);

    });
};