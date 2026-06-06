const reviewModel = require('../models/movieReviews.js');
const UserDataError = require('../errors/UserDataError.js');
const { ObjectId } = require('mongodb');

async function addReview(req, res) {
  const dateReviewed = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  if (!req.params.movieId) {
    throw new UserDataError('A movieId is required to add a review.');
  }

  if (!req.body.review) {
    throw new UserDataError('A review is required.');
  }

  const movieId = new ObjectId(req.params.movieId);
  const review = req.body.review;

  const response = await reviewModel.insertReview(
    movieId,
    review,
    dateReviewed
  );

  res.json(response);
}

async function listReviewsByMovie(req, res) {
  if (!req.params.movieId) {
    throw new UserDataError('A movieId is required to get reviews.');
  }

  const movieId = new ObjectId(req.params.movieId);
  const response = await reviewModel.getReviewsByMovie(movieId);

  res.json(response);
}

async function deleteReviewsByMovie(req, res) {
  if (!req.params.movieId) {
    throw new UserDataError('A movieId is required to delete reviews.');
  }

  const movieId = new ObjectId(req.params.movieId);
  const response = await reviewModel.deleteReviewsByMovie(movieId);

  res.json(response);
}

module.exports = {
  addReview,
  listReviewsByMovie,
  deleteReviewsByMovie,
};
