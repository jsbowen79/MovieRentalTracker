const { getDB } = require('../models/mongoDb');
const { ObjectId } = require('mongodb');
const movieInfo = require('../models/movieInformation');
const UserDataError = require('../errors/UserDataError');
const NotFoundError = require('../errors/NotFoundError');
const MongoDBConnectionError = require('../errors/MongoDBConnectionError');

// GET ALL MOVIES
const getAllAvailableMovies = async (req, res) => {
  const db = await getDB();
  try {
    const movies = await db.collection('availableMovies').find().toArray();
    res.status(200).json({
      count: movies.length,
      data: movies,
    });
  } catch {
    throw new MongoDBConnectionError('There was a problem with the database.');
  }
};

// CREATE MOVIE
const addAvailableMovie = async (req, res) => {
  const db = await getDB();
  let movie;
  let result;
  try {
    movie = await movieInfo.getMovieById(req.body.movieId);
  } catch {
    throw new MongoDBConnectionError('There was a problem with the database.');
  }
  if (movie) {
    const genre = movie.genre;
    const newEntry = {
      movieId: movie._id,
      availableCopies: req.body.availableCopies,
      genre: genre,
    };
    try {
      result = await db.collection('availableMovies').insertOne(newEntry);
    } catch {
      throw new MongoDBConnectionError(
        'There was a problem with the database. '
      );
    }
    res.status(201).json({
      message: 'Movie Entered into inventory successfully',
      id: result.insertedId,
    });
  } else {
    throw new UserDataError('There is no movie with that Id in the database.');
  }
};

// GET BY GENRE
const getAvailableMoviesByGenre = async (req, res) => {
  const db = await getDB();
  let movies;
  const genre = req.params.genreId;
  try {
    movies = await db
      .collection('availableMovies')
      .find({ genre: genre })
      .toArray();
  } catch {
    throw new MongoDBConnectionError('There was a problem with the Daatabase.');
  }

  if (movies.length > 0) {
    res.status(200).json({
      count: movies.length,
      data: movies,
    });
  } else {
    throw new NotFoundError('No movies were found in that genre.');
  }
};

// UPDATE MOVIE
const updateAvailableMovie = async (req, res) => {
  const db = await getDB();
  let movie;
  let result;
  const movieId = req.params.movieId;
  console.log(`MovieId: {movieId}`)
  try {
    movie = await movieInfo.getMovieById(movieId);
  } catch {
    throw new MongoDBConnectionError('There was a problem with the Database. ');
  }
  if (movie == null) {
    throw new NotFoundError('There are no movies with that Id');
  } else {
    const genre = movie.genre;

    const updatedMovie = {
      movieId: movie.movieId,
      genre: genre,
      availableCopies: req.params.availableCopies,
    };
    try {
      result = await db
        .collection('availableMovies')
        .updateOne({ movieId: movie.movieId }, { $set: updatedMovie });
    } catch {
      throw new MongoDBConnectionError(
        'There was a problem with the database.'
      );
    }

    if (result.matchedCount === 0) {
      throw new NotFoundError('Movie not found');
    }

    res.status(200).json({
      message: 'Movie updated successfully',
    });
  }
};

// DELETE MOVIE
const deleteAvailableMovie = async (req, res) => {
  const db = await getDB();
  const id = req.params.movieId;
  let result;
  try {
    result = await db
      .collection('availableMovies')
      .deleteOne({ movieId: new ObjectId(id) });
  } catch {
    throw new MongoDBConnectionError('There was a problem with the database.');
  }

  if (result.deletedCount === 0) {
    throw new NotFoundError('The movie does not exist');
  }

  res.status(200).json({
    message: 'Movie deleted successfully',
  });
};

// EXPORTS
module.exports = {
  getAllAvailableMovies,
  addAvailableMovie,
  getAvailableMoviesByGenre,
  updateAvailableMovie,
  deleteAvailableMovie,
};
