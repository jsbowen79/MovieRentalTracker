const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler');
const availableMoviesController = require('../controllers/availableMovies.js');

const validateMovie = require('../middleware/availableMoviesValidator');
const requireAuth = require('../middleware/requireAuth');
const authorizeUser = require('../middleware/authorizeUser');

// CREATE MOVIE (admin only)
router.post(
  '/',
  requireAuth,
  authorizeUser('admin'),
  validateMovie,
  asyncHandler(availableMoviesController.createMovie)
);

// GET ALL MOVIES (public)
router.get(
  '/',
  asyncHandler(availableMoviesController.getAllMovies)
);

// GET BY GENRE (logged in users)
router.get(
  '/:genreId',
  requireAuth,
  asyncHandler(availableMoviesController.getByGenre)
);

// UPDATE MOVIE (admin only)
router.put(
  '/:id',
  requireAuth,
  authorizeUser('admin'),
  validateMovie,
  asyncHandler(availableMoviesController.updateMovie)
);

// DELETE MOVIE (admin only)
router.delete(
  '/:id',
  requireAuth,
  authorizeUser('admin'),
  asyncHandler(availableMoviesController.deleteMovie)
);

module.exports = router;