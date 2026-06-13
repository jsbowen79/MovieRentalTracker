const router = require('express').Router();
const asyncHandler = require('../errors/AsyncHandler');
const {
  addAvailableMovieRules,
  updateAvailableMovieRules,
  validateAvailableMovie,
} = require('../middleware/availableMoviesValidator.js');
const availableMoviesController = require('../controllers/availableMovies.js');
const requireAuth = require('../middleware/requireAuth');
const authorizeUser = require('../middleware/authorizeUser');

// CREATE MOVIE (admin only)
router.post(
  '/',
  authorizeUser('admin'),
  addAvailableMovieRules(),
  validateAvailableMovie,
  asyncHandler(availableMoviesController.addAvailableMovie)
);

// GET ALL
router.get('/', asyncHandler(availableMoviesController.getAllAvailableMovies));

// GET BY GENRE (logged in users)
router.get(
  '/:genreId',
  requireAuth,
  asyncHandler(availableMoviesController.getAvailableMoviesByGenre)
);

// UPDATE MOVIE (admin only)
router.put(
  '/:movieId',
  authorizeUser('admin'),
  updateAvailableMovieRules(),
  validateAvailableMovie,
  asyncHandler(availableMoviesController.updateAvailableMovie)
);

// DELETE MOVIE (admin only)
router.delete(
  '/:movieId',
  authorizeUser('admin'),
  asyncHandler(availableMoviesController.deleteAvailableMovie)
);

module.exports = router;
