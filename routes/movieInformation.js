const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler.js');
const movieInfoController = require('../controllers/movieInformation.js');

router.get('/', asyncHandler(movieInfoController.getAllMovies));
router.get('/:id', asyncHandler(movieInfoController.getMovieById));
router.put('/:id', asyncHandler(movieInfoController.updateMovieInfo));
router.post('/', asyncHandler(movieInfoController.addMovie));
router.delete('/:id', asyncHandler(movieInfoController.deleteMovie));

module.exports = router;
