const express = require('express');
const Movie = require('../models/movie');

const router = express.Router();

//Get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Find one movie by ID
router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findOne({_id: req.params.id});
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    res.send(movie);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Post movie details
router.post('/movies', (req, res) => {
    const { movieTitle, movieRunTime, movieGenre, movieDescription, movieReleaseDate, movieCast, movieRating } = req.body;
    const movie = new Movie({ movieTitle, movieRunTime, movieGenre, movieDescription, movieReleaseDate, movieCast, movieRating });
  
    movie.save()
      .then(() => {
        res.status(201).send('Movie Created ');
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
});

//Patch movie details
router.patch('/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  const { movieTitle, movieRunTime, movieGenre, movieDescription, movieReleaseDate, movieCast, movieRating } = req.body;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send('Movie not found');
      }

      if (movieTitle) {
        movie.movieTitle = movieTitle;
      }

      if (movieRunTime) {
        movie.movieRunTime = movieRunTime;
      }

      if (movieGenre) {
        movie.movieGenre = movieGenre;
      }

      if (movieDescription) {
        movie.movieDescription = movieDescription;
      }

      if (movieReleaseDate) {
        movie.movieReleaseDate = movieReleaseDate;
      }
      
      if (movieCast) {
        movie.movieCast = movieCast;
      }

      if (movieRating) {
        movie.movieRating = movieRating;
      }

      return movie.save();
    })
    .then(() => {
      res.send('Movie updated successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

//Delete movie
router.delete('/:movieId', (req, res) => {
  const movieId = req.params.movieId;

  Movie.findByIdAndDelete(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send('Movie not found');
      }

      res.send('Movie deleted successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;