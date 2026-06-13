const UserDataError = require('../errors/UserDataError');

function validateMovie(req, res, next) {
  const {
    title,
    movieId,
    genre,
    year,
    language,
    studio,
    durationMinutes,
    rating,
    availableCopies,
  } = req.body;

  // helper for empty/invalid strings
  const isEmpty = (val) => !val || val.toString().trim() === '';

  // Required fields check
  if (
    isEmpty(title) ||
    isEmpty(movieId) ||
    isEmpty(genre) ||
    isEmpty(language) ||
    isEmpty(studio)
  ) {
    return next(new UserDataError('Missing required movie fields'));
  }

  // Convert numeric fields safely
  const parsedYear = Number(year);
  const parsedRating = Number(rating);
  const parsedCopies = Number(availableCopies);
  const parsedDuration = Number(durationMinutes);

  req.body.year = parsedYear;
  req.body.rating = parsedRating;
  req.body.availableCopies = parsedCopies;
  req.body.durationMinutes = parsedDuration;

  // Year validation (realistic range)
  if (
    !Number.isInteger(parsedYear) ||
    parsedYear < 1888 ||
    parsedYear > new Date().getFullYear() + 1
  ) {
    return next(new UserDataError('Invalid year value'));
  }

  // Rating validation (0–10)
  if (Number.isNaN(parsedRating) || parsedRating < 0 || parsedRating > 10) {
    return next(new UserDataError('Rating must be between 0 and 10'));
  }

  // Available copies validation
  if (!Number.isInteger(parsedCopies) || parsedCopies < 0) {
    return next(new UserDataError('Invalid available copies value'));
  }

  // Duration validation
  if (!Number.isInteger(parsedDuration) || parsedDuration <= 0) {
    return next(new UserDataError('Duration must be a positive number'));
  }

  next();
}

module.exports = validateMovie;
