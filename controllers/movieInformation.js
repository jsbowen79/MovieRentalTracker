const movieInfoModel = require('../models/movieInformation');
const { ObjectId } = require('mongodb');
const UserDataError = require('../errors/UserDataError');
const MovieNotFoundError = require('../errors/NotFoundError');
const AppError = require('../errors/AppError');

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await movieInfoModel.getAllMovies();
    res.status(200).json(movies);
  } catch {
    next(new AppError('Failed to retrieve movies', 500));
  }
};

const getMovieById = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return next(new UserDataError('Invalid movie ID'));
    }
    const movie = await movieInfoModel.getMovieById(req.params.id);
    if (!movie) {
      return next(new MovieNotFoundError('Movie not found', 404));
    } else {
      res.status(200).json(movie);
    }
  } catch {
    next(new AppError('Failed to retrieve movie', 500));
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
  } catch {
    next(new AppError('Failed to add movie', 500));
  }
};

const updateMovieInfo = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return next(new UserDataError('Invalid movie ID'));
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
      return next(new MovieNotFoundError('Movie not found', 404));
    }
    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: 'No changes made' });
    }
    res.status(200).json({ message: 'Movie updated successfully' });
  } catch {
    next(new AppError('Failed to update movie', 500));
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return next(new UserDataError('Invalid movie ID'));
    }
    const result = await movieInfoModel.deleteMovie(req.params.id);
    if (result.deletedCount === 0) {
      return next(new MovieNotFoundError('Movie not found', 404));
    }
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch {
    next(new AppError('Failed to delete movie', 500));
  }
};
module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovieInfo,
  deleteMovie,
};
