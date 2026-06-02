const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler.js');
const movieInfoController = require('../controllers/movieInformation.js');

const notImplemented = (req, res) => {
  res.status(501).json({
    message: 'Endpoint not implemented',
  });
};

router.post('/', notImplemented);
router.put('/:movieId', notImplemented);
router.get('/', asyncHandler(movieInfoController.getAllMovies));
router.get('/:movieId', notImplemented);
router.delete('/:movieId', notImplemented);

module.exports = router;
