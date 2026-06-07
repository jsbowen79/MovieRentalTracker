const router = require('express').Router();
const AsyncHandler = require('../errors/AsyncHandler.js');
const movieInfoController = require('../controllers/movieInformation.js');

router.get('/', AsyncHandler(movieInfoController.getAllMovies));
router.get('/:id', AsyncHandler(movieInfoController.getMovieById));
router.put('/:id', AsyncHandler(movieInfoController.updateMovieInfo));
router.post('/', AsyncHandler(movieInfoController.addMovie));
router.delete('/:id', AsyncHandler(movieInfoController.deleteMovie));

module.exports = router;
