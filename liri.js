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
        bands(value)
        break;
    
    case "spotify-this-song":
        songs(value)
        break;

    case "movies-this":
        if (value == "") {
            value = defaultMovie;
        }
        movies(value)
        break;

    case "do-what-it-says":
        readFile();
        break;
    
    default:
        break;
}

function bands(artist) {

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

function songs(trackName) {

if (trackName === "") {
    trackName = "L$D"
}

spotify.search({type: 'track', query: trackName },function (err, data) {

    if(err) {
        console.log("Error: " + err);
    }

    console.log("Artist: ", data.tracks.items[0].album.artists[0].name);
    console.log("Preview: ", data.tracks.items[0].preview_url);
    console.log("Album: ", data.tracks.items[0].album.name);
});
}

function movies(movieTitle) {

axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${movieTitle}`)
    .then(function (response) {

        var results = `Title: ${response.data.Title} \nRelease Year: ${response.data.Year} \n Imdb Rating: ${response.data.Rating} \nRotten Tomatoes Rating: ${response.data.Rating[1].Value} Plot: ${response.data.Plot} \nActors: ${response.data.Actors}`;

        console.log(results)

    }) .catch(function (err) {
        console.log(err)
    });

    if (movieTitle === "Interstellar") {
        console.log("The best movie of all time!!!")
    };

} 
 
function readFile() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        data = data.split(",");

        var response = data[0];
        var value = data[1];

        switch (response) {
            case "concert-this":
                bands(value)
                break;

            case "spotify-this-song":
                songs(value)
                break;

            case "movies-this":
                movies(value)
                break;

        }

    })
}