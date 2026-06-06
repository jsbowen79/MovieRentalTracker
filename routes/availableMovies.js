const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler');
const availableMoviesController = require('../controllers/availableMovies.js');

// CREATE MOVIE
router.post('/', asyncHandler(availableMoviesController.createMovie));

// GET ALL MOVIES
router.get('/', asyncHandler(availableMoviesController.getAllMovies));

// GET BY GENRE
router.get('/:genreId', asyncHandler(availableMoviesController.getByGenre));

// UPDATE MOVIE 
router.put('/:id', asyncHandler(availableMoviesController.updateMovie));

// DELETE MOVIE
router.delete('/:id', asyncHandler(availableMoviesController.deleteMovie));

module.exports = router;