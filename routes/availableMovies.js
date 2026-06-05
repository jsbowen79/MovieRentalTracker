
const router = require('express').Router();

const availableMoviesController = require('../controllers/availableMovies.js');

// CREATE MOVIE
router.post('/', asyncHandler(availableMoviesController.createMovie));

// GET ALL MOVIES
router.get('/', asyncHandler(availableMoviesController.getAllMovies));

// GET BY GENRE
router.get('/:genreId', asyncHandler(availableMoviesController.getByGenre));

// DELETE MOVIE
router.delete('/:userId', asyncHandler(availableMoviesController.deleteMovie));

module.exports = router;