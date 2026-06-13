const router = require('express').Router();
const asyncHandler = require('../errors/AsyncHandler');
const availableMoviesController = require('../controllers/availableMovies.js');

const validateMovie = require('../middleware/availableMoviesValidator');
const requireAuth = require('../middleware/requireAuth');
const authorizeUser = require('../middleware/authorizeUser');

// CREATE MOVIE (admin only)
router.post(
  '/',
  authorizeUser('admin'),
  validateMovie,
  asyncHandler(availableMoviesController.createMovie)
);

// GET ALL MOVIES (public)
router.get('/', asyncHandler(availableMoviesController.getAllAvailableMovies));

// GET BY GENRE (logged in users)
router.get(
  '/:genreId',
  requireAuth,
  asyncHandler(availableMoviesController.getAvailableMoviesByGenre)
);

// UPDATE MOVIE (admin only)
router.put(
  '/:id',
  authorizeUser('admin'),
  validateMovie,
  asyncHandler(availableMoviesController.updateAvailableMovie)
);

// DELETE MOVIE (admin only)
router.delete(
  '/:id',
  authorizeUser('admin'),
  asyncHandler(availableMoviesController.deleteAvailableMovie)
);

module.exports = router;
