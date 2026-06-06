const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler.js');
const reviewController = require('../controllers/movieReviews.js');

router.post('/:movieId', asyncHandler(reviewController.addReview));
// #swagger.tags = ['Reviews']
// #swagger.description = 'Add a review for a movie by movieId'
// #swagger.parameters['movieId'] = { in: 'path', required: true, description: 'Movie ID' }
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: {
//     review: 'This movie was excellent.'
//   }
// }

router.get('/:movieId', asyncHandler(reviewController.listReviewsByMovie));
// #swagger.tags = ['Reviews']
// #swagger.description = 'Get all reviews for a specific movie'
// #swagger.parameters['movieId'] = { in: 'path', required: true, description: 'Movie ID' }

router.delete('/:movieId', asyncHandler(reviewController.deleteReviewsByMovie));
// #swagger.tags = ['Reviews']
// #swagger.description = 'Delete all reviews for a specific movie'
// #swagger.parameters['movieId'] = { in: 'path', required: true, description: 'Movie ID' }

module.exports = router;
