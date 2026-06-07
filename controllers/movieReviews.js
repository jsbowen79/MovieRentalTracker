const reviewModel = require('../models/movieReviews.js');
const UserDataError = require('../errors/UserDataError.js');
const { ObjectId } = require('mongodb');

async function addReview(req, res) {
  if (!req.params.movieId) {
    throw new UserDataError('A movieId is required to add a review.');
  }

  if (!req.body.reviewer) {
    throw new UserDataError('A reviewer name is required.');
  }

  if (!req.body.rating) {
    throw new UserDataError('A rating is required.');
  }

  if (!req.body.reviewText) {
    throw new UserDataError('A reviewText is required.');
  }

  const movieId = new ObjectId(req.params.movieId);
  const reviewer = req.body.reviewer;
  const rating = Number(req.body.rating);
  const reviewText = req.body.reviewText;
  const createdAt = new Date();

  const response = await reviewModel.insertReview(
    movieId,
    reviewer,
    rating,
    reviewText,
    createdAt
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
