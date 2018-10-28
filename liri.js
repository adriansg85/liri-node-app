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

//choice variable
var moduleChoice = "";

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
    //console.log("\nYou Chose:");
    console.log(answers.choice);
    moduleChoice = answers.choice;

    //Condition to choose the next question
    switch (moduleChoice) {
        case "concert":
            concertFunction();
            break;
        case "spot":
            spotFunction();
            break;
        case "movie":
            movieFunction();
            break;
        case "defaukt":
            defaultFunction();
            break;
        default:
            console.log("Something went wrong, please try again");
            break;
    }
});

// functions for next question execution
function concertFunction() {
    var concert = [{
        type: "input",
        name: "term",
        message: "Please choose your band",
        default: "The Killers"
    }, ];

    inquirer.prompt(concert).then(answers => {
        //console.log("\nYou Chose:");
        console.log(answers.term);
    });
}

function spotFunction() {
    var spot = [{
        type: "input",
        name: "term",
        message: "Please choose your song",
        default: "Yellow Submarine"
    }, ];

    inquirer.prompt(spot).then(answers => {
        //console.log("\nYou Chose:");
        console.log(answers.term);
    });
}

function movieFunction() {
    var movie = [{
        type: "input",
        name: "term",
        message: "Please choose your movie",
        default: "Gladiator"
    }, ];
    inquirer.prompt(movie).then(answers => {
        //console.log("\nYou Chose:");
        console.log(answers.term);
    });
}




// spotify.search({
//     type: 'track',
//     query: 'The beautiful people',
//     limit: 1
// }, function (err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }

//     console.log(JSON.stringify(data, null, 2));
// });