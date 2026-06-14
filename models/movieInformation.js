const MongoDBConnectionError = require('../errors/MongoDBConnectionError');
const mongodb = require('./mongoDb');
const { ObjectId } = require('mongodb');

const getAllMovies = async () => {
  try {
    const db = await mongodb.getDB();
    return await db.collection('movieInfo').find().toArray();
  } catch {
    throw new MongoDBConnectionError('There was a problem with the database');
  }
};

const getMovieById = async (id) => {
  try {
    const movieId = new ObjectId(id);
    const db = await mongodb.getDB();
  const result =  await db.collection('movieInfo').findOne({ _id: movieId });
  return result; 
  } catch {
    throw new MongoDBConnectionError('There was a problem with the database');
  }
};

const addMovie = async (movie) => {
  try {
    const db = await mongodb.getDB();
    const result = await db.collection('movieInfo').insertOne(movie);
    return result;
  } catch {
    throw new MongoDBConnectionError('There was a problem with the database');
  }
};

const updateMovieInfo = async (id, updatedMovie) => {
  try {
    const movieId = new ObjectId(id);
    const db = await mongodb.getDB();
    const result = await db
      .collection('movieInfo')
      .replaceOne({ _id: movieId }, updatedMovie);
    return result;
  } catch {
    throw new MongoDBConnectionError('There was a problem with the database');
  }
};

const deleteMovie = async (id) => {
  try {
    const movieId = new ObjectId(id);
    const db = await mongodb.getDB();
    const result = await db.collection('movieInfo').deleteOne({ _id: movieId });
    return result;
  } catch {
    throw new MongoDBConnectionError('There was a problem with the database');
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovieInfo,
  deleteMovie,
};
