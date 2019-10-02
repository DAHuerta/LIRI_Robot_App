require("dotenv").config();

var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new spotify({

    id: keys.spotify.id,
    secret: keys.spotify.secret,

});

var defaultSong = "L$D"
var defaultMovie = "Interstellar";
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var value = process.argv[3];

switch (command) {
    case "concert-this":
        getBands(value)
        break;
    
    case "spotify-this-song":
        getSongs(value)
        break;

    case "movies-this":
        if (value == "") {
            value = defaultMovie;
        }
        getMovies(value)
        break;

    case "do-what-it-says":
        readFile();
        break;
    
    default:
        break;
}

function getBands(artist) {

axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`)
    .then(function (response) {

        console.log("location: ", response.data[0].venue.city)
        console.log("Venue: ", response.data[0].venue.name)

        var eventDate = moment(response.data[0].datetime).format("MM/DD/YYYY");

        console.log("Date: ", eventDate);

    })
    .catch(function (err) {
        console.log(err);
    });

}
 
