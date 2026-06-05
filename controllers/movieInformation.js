const movieInfoModel = require('../models/movieInformation');
const { ObjectId } = require('mongodb');

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await movieInfoModel.getAllMovies();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }
    const movie = await movieInfoModel.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    } else {
      res.status(200).json(movie);
    }
  } catch (error) {
    next(error);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const newMovie = {
      title: req.body.title,
      director: req.body.director,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      main_actors: req.body.main_actors,
      length_minutes: req.body.length_minutes,
      studio: req.body.studio,
      language: req.body.language,
    };
    const result = await movieInfoModel.addMovie(newMovie);
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ error: 'Failed to add movie' });
    }
  } catch (error) {
    next(error);
  }
};

const updateMovieInfo = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }
    const updatedMovie = {
      title: req.body.title,
      director: req.body.director,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      main_actors: req.body.main_actors,
      length_minutes: req.body.length_minutes,
      studio: req.body.studio,
      language: req.body.language,
    };
    const result = await movieInfoModel.updateMovieInfo(
      req.params.id,
      updatedMovie
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    if (result.modifiedCount > 0) {
      return res.status(200).json({ message: 'Movie updated successfully' });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }
    const result = await movieInfoModel.deleteMovie(req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovieInfo,
  deleteMovie,
};
