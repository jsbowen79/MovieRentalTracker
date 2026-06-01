const reviewsModel = require('../models/movieReviews');

// Create review
async function createReview(req, res) {
  const result = await reviewsModel.createReview(req.body);
  res.status(201).json(result);
}

// Get all reviews
async function getAllReviews(req, res) {
  const reviews = await reviewsModel.getAllReviews();
  res.json(reviews);
}

// Get reviews by movie
async function getReviewsByMovie(req, res) {
  const reviews = await reviewsModel.getReviewsByMovie(req.params.movieId);
  res.json(reviews);
}

// Get single review
async function getReviewById(req, res) {
  const review = await reviewsModel.getReviewById(req.params.id);
  res.json(review);
}

// Update review
async function updateReview(req, res) {
  const result = await reviewsModel.updateReview(req.params.id, req.body);
  res.json(result);
}

// Delete review
async function deleteReview(req, res) {
  const result = await reviewsModel.deleteReview(req.params.id);
  res.json(result);
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewsByMovie,
  getReviewById,
  updateReview,
  deleteReview,
};
