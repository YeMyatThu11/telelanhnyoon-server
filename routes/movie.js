const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovie,
  createMovie,
  editMovie,
  deleteMovie,
  getPopularMovies,
  addNewEpisode,
  searchMovie,
  getSpecificMoviesType,
  getMovieWithGenre,
} = require('../controllers/movie');
router.route('/').get(getMovies).post(createMovie).put(addNewEpisode);
router.route('/search/:word/:skip?').get(searchMovie);
router.route('/popular').get(getPopularMovies);
router.route('/specific/:movieType/:skip?').get(getSpecificMoviesType);
router.route('/genre/:genreType/:skip?').get(getMovieWithGenre);
router.route('/:id').get(getMovie).put(editMovie).delete(deleteMovie);

module.exports = router;
