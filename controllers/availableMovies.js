const { getDB } = require('../models/mongoDb');
const { ObjectId } = require('mongodb');

// GET ALL MOVIES
const getAllMovies = async (req, res) => {
  const db = await getDB();
  const movies = await db.collection('availableMovies').find().toArray();

  res.status(200).json({
    count: movies.length,
    data: movies
  });
};

// CREATE MOVIE
const createMovie = async (req, res) => {
  const db = await getDB();

  const newMovie = {
    title: req.body.title,
    movieId: req.body.movieId,
    genre: req.body.genre,
    year: req.body.year,
    language: req.body.language,
    studio: req.body.studio,
    durationMinutes: req.body.durationMinutes,
    rating: req.body.rating,
    availableCopies: req.body.availableCopies,
    createdAt: new Date()
  };

  const result = await db.collection('availableMovies').insertOne(newMovie);

  res.status(201).json({
    message: "Movie created successfully",
    id: result.insertedId
  });
};

// GET BY GENRE
const getByGenre = async (req, res) => {
  const db = await getDB();

  const genre = req.params.genreId;

  const movies = await db.collection('availableMovies')
    .find({ genre: genre })
    .toArray();

  res.status(200).json({
    count: movies.length,
    data: movies
  });
};

// UPDATE MOVIE 
const updateMovie = async (req, res) => {
  const db = await getDB();

  const id = req.params.id;

  const updatedMovie = {
    title: req.body.title,
    movieId: req.body.movieId,
    genre: req.body.genre,
    year: req.body.year,
    language: req.body.language,
    studio: req.body.studio,
    durationMinutes: req.body.durationMinutes,
    rating: req.body.rating,
    availableCopies: req.body.availableCopies
  };

  const result = await db.collection('availableMovies').updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedMovie }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.status(200).json({
    message: "Movie updated successfully"
  });
};

// DELETE MOVIE
const deleteMovie = async (req, res) => {
  const db = await getDB();

  const id = req.params.id;

  const result = await db.collection('availableMovies')
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.status(200).json({
    message: "Movie deleted successfully"
  });
};

// EXPORTS
module.exports = {
  getAllMovies,
  createMovie,
  getByGenre,
  updateMovie,
  deleteMovie
};