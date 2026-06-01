const { ObjectId } = require('mongodb');
const { getDB } = require('./mongoDb');

const collectionName = 'movieReviews';

// Create review
async function createReview(review) {
  const db = await getDB();
  const result = await db.collection(collectionName).insertOne({
    ...review,
    movieId: new ObjectId(review.movieId),
    createdAt: new Date(),
  });

  return result;
}

// Get all reviews
async function getAllReviews() {
  const db = await getDB();
  return await db.collection(collectionName).find().toArray();
}

// Get reviews for a movie
async function getReviewsByMovie(movieId) {
  const db = await getDB();
  return await db
    .collection(collectionName)
    .find({
      movieId: new ObjectId(movieId),
    })
    .toArray();
}

// Get single review
async function getReviewById(id) {
  const db = await getDB();
  return await db.collection(collectionName).findOne({
    _id: new ObjectId(id),
  });
}

// Update review
async function updateReview(id, updateData) {
  const db = await getDB();
  return await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
}

// Delete review
async function deleteReview(id) {
  const db = await getDB();
  return await db.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  });
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewsByMovie,
  getReviewById,
  updateReview,
  deleteReview,
};
