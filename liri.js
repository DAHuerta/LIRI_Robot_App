require("dotenv").config();

var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify({

    id: keys.spotify.id,
    secret: keys.spotify.secret,

});

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
        movies(value)
        break;

    case "do-what-it-says":
        readFile();
        break;
    
    default:
        break;
}

function bands(artist) {

    if (!artist) {
        artist = "Jose Gonzalez"
    }

axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`)
    .then(function (response) {
        
        for (var i = 0; i < response.data.length; i++) {

            console.log("location: ", response.data[i].venue.city)
            console.log("Venue: ", response.data[i].venue.name)
            
            var eventDate = moment(response.data[i].datetime).format("MM/DD/YYYY");
            
            console.log("Date: ", eventDate);
            
        }
    })
    .catch(function (err) {
        console.log(err);
    });
}

function songs(trackName) {

if (!trackName) {
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

    if (!movieTitle) {
        movieTitle = "Interstellar"
    } 

axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${movieTitle}`)
    .then(function (response) {
        // console.log(response.data.Ratings[1])
        var results = `Title: ${response.data.Title} \nRelease Year: ${response.data.Year} \nImdb Rating: ${response.data.Ratings[0].Value} \nRotten Tomatoes Rating: ${response.data.Ratings[1].Value} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}`;

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

            default:
                break;

        }
    });
}