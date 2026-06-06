const { getDB } = require('./mongoDb.js');
const MongoDBConnectionError = require('../errors/MongoDBConnectionError.js');
const NotFoundError = require('../errors/NotFoundError.js');
const AppError = require('../errors/AppError.js');

async function insertReview(movieId, review, dateReviewed) {
  const db = await getDB();
  let movieName;

  try {
    const movieRecord = await db
      .collection('movieInfo')
      .findOne({ _id: movieId });

    if (movieRecord) {
      movieName = movieRecord.title;
    } else {
      throw new NotFoundError(
        'The movie you are trying to review does not exist.'
      );
    }
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new MongoDBConnectionError(
      `There was a problem retrieving the movie from the database. ${error}`
    );
  }

  try {
    const entry = {
      movieId,
      review,
      dateReviewed,
    };

    const data = await db.collection('movieReviews').insertOne(entry);
    const reviewId = data.insertedId.toString();

    return `Review successfully added for ${movieName}. Review id is ${reviewId}.`;
  } catch (error) {
    throw new MongoDBConnectionError(
      `There was a problem saving the review to the database. ${error}`
    );
  }
}

async function getReviewsByMovie(movieId) {
  const db = await getDB();

  try {
    const reviews = await db
      .collection('movieReviews')
      .find({ movieId: movieId })
      .toArray();

    if (reviews.length > 0) {
      return reviews;
    }

    throw new NotFoundError('No reviews found for this movie.');
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new MongoDBConnectionError(
      `There was a problem retrieving reviews from the database. ${error}`
    );
  }
}

async function deleteReviewsByMovie(movieId) {
  const db = await getDB();

  try {
    const result = await db
      .collection('movieReviews')
      .deleteMany({ movieId: movieId });

    if (result.deletedCount > 0) {
      return result;
    }

    throw new NotFoundError('No reviews found to delete for this movie.');
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new MongoDBConnectionError(
      `There was a problem deleting reviews from the database. ${error}`
    );
  }
}

module.exports = {
  insertReview,
  getReviewsByMovie,
  deleteReviewsByMovie,
};
