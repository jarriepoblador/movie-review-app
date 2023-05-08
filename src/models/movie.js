const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieTitle: {
        type: String,
        required: [true, "Please enter a movie title."]
    },

    movieRunTime: {
        type: String,
        required: [true, "Please enter the running time of the movie."]
    },

    movieGenre: {
        type: String,
        required: [true, "Please enter the genre of the movie."]
    },

    movieDescription: {
        type: String,
        required: [true, "Please enter the description for the movie."]
    },

    movieReleaseDate: {
        type: String,
        required: [true, "Please enter the release date of the movie."]
    },

    movieCast: {
        type: String,
        required: [true, "Please enter the cast of the movie."]
    },

    movieRating: {
        type: Number
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;