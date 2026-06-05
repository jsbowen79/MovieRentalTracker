const mongobd = require('./mongoDb');
const { ObjectId } = require('mongodb');

const getAllMovies = async () => {
  try {
    const db = await mongobd.getDB();
    return await db.collection('movieInfo').find().toArray();
  } catch (error) {
    throw error;
  }
};

const getMovieById = async (id) => {
  try {
    const movieId = new ObjectId(id);
    const db = await mongobd.getDB();
    return await db.collection('movieInfo').findOne({ _id: movieId });
  } catch (error) {
    throw error;
  }
};

const addMovie = async (movie) => {
  try {
    const db = await mongobd.getDB();
    const result = await db.collection('movieInfo').insertOne(movie);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateMovieInfo = async (id, updatedMovie) => {
  try {
    const movieId = new ObjectId(id);
    const db = await mongobd.getDB();
    const result = await db
      .collection('movieInfo')
      .replaceOne({ _id: movieId }, updatedMovie);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteMovie = async (id) => {
  try {
    const movieId = new ObjectId(id);
    const db = await mongobd.getDB();
    const result = await db.collection('movieInfo').deleteOne({ _id: movieId });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovieInfo,
  deleteMovie,
};
