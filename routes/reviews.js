const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler');
const controller = require('../controllers/movieReviews');

const notImplemented = (req, res) => {
  res.status(501).json({
    message: 'Endpoint not implemented',
  });
};



// Create review
router.post('/', asyncHandler(controller.createReview));

// Get all reviews
router.get('/', asyncHandler(controller.getAllReviews));

// Get reviews for a movie
router.get('/movie/:movieId', asyncHandler(controller.getReviewsByMovie));

// Get single review
router.get('/:id', asyncHandler(controller.getReviewById));

// Update review
router.put('/:id', asyncHandler(controller.updateReview));

// Delete review
router.delete('/:id', asyncHandler(controller.deleteReview));


router.post('/:movieId', notImplemented);
router.get('/:movieId', notImplemented);
router.delete('/:movieId', notImplemented);

module.exports = router;
