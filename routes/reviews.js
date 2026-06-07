const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler.js');
const reviewController = require('../controllers/movieReviews.js');

router.post('/:movieId', asyncHandler(reviewController.addReview));
// #swagger.tags = ['Reviews']
// #swagger.description = 'Add a review for a movie by movieId'
// #swagger.parameters['movieId'] = { in: 'path', required: true, description: 'MongoDB ObjectId of the movie' }
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: {
//     reviewer: 'Miracle Lawrence',
//     rating: 5,
//     reviewText: 'A powerful classic movie with excellent acting.'
//   }
// }

router.get('/:movieId', asyncHandler(reviewController.listReviewsByMovie));
// #swagger.tags = ['Reviews']
// #swagger.description = 'Get all reviews for a specific movie'
// #swagger.parameters['movieId'] = { in: 'path', required: true, description: 'MongoDB ObjectId of the movie' }

router.delete('/:movieId', asyncHandler(reviewController.deleteReviewsByMovie));
// #swagger.tags = ['Reviews']
// #swagger.description = 'Delete all reviews for a specific movie'
// #swagger.parameters['movieId'] = { in: 'path', required: true, description: 'MongoDB ObjectId of the movie' }

module.exports = router;
