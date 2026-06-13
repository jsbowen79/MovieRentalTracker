const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler');
const availableMoviesController = require('../controllers/availableMovies.js');

const validateMovie = require('../middleware/availableMoviesValidator');
const requireAuth = require('../middleware/requireAuth');
const authorizeUser = require('../middleware/authorizeUser');

// CREATE MOVIE (protected)
router.post(
  '/',
  requireAuth,
  authorizeUser('admin'),
  validateMovie,
  asyncHandler(availableMoviesController.createMovie)
);

// GET ALL MOVIES (public or logged-in depending on your rule)
router.get(
  '/',
  requireAuth,
  asyncHandler(availableMoviesController.getAllMovies)
);

// GET BY GENRE
router.get(
  '/:genreId',
  requireAuth,
  asyncHandler(availableMoviesController.getByGenre)
);

// UPDATE MOVIE (protected)
router.put(
  '/:id',
  requireAuth,
  authorizeUser('admin'),
  validateMovie,
  asyncHandler(availableMoviesController.updateMovie)
);

// DELETE MOVIE (protected)
router.delete(
  '/:id',
  requireAuth,
  authorizeUser('admin'),
  asyncHandler(availableMoviesController.deleteMovie)
);

module.exports = router;