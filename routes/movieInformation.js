const router = require('express').Router();
const AsyncHandler = require('../errors/AsyncHandler.js');
const movieInfoController = require('../controllers/movieInformation.js');
const { movieInfoRules, validateMovieInfo } = require('../middleware/movieInfoValidate.js');
const authenticateUser = require('../middleware/authorizeUser.js');

router.get(
    '/',
    AsyncHandler(movieInfoController.getAllMovies));

router.get(
    '/:id',
    AsyncHandler(movieInfoController.getMovieById));

router.put(
    '/:id',
    authenticateUser('admin'),
    movieInfoRules(),
    validateMovieInfo,
    AsyncHandler(movieInfoController.updateMovieInfo));

router.post(
    '/',
    authenticateUser('admin'),
    movieInfoRules(),
    validateMovieInfo,
    AsyncHandler(movieInfoController.addMovie));

router.delete(
    '/:id',
    authenticateUser('admin'),
    AsyncHandler(movieInfoController.deleteMovie));

module.exports = router;
