const UserDataError = require('../errors/UserDataError');

function validateMovie(req, res, next) {
  const {
    movieId,
    genre,
    availableCopies,
  } = req.body;

  // helper for empty/invalid strings
  const isEmpty = (val) => !val || val.toString().trim() === '';

  // Required fields check
  if (
    isEmpty(movieId) 
  ) {
    return next(new UserDataError('Missing required movie fields'));
  }

  // Convert numeric fields safely
  const parsedCopies = Number(availableCopies);

  req.body.availableCopies = parsedCopies;

  // Available copies validation
  if (!Number.isInteger(parsedCopies) || parsedCopies < 0) {
    return next(new UserDataError('Invalid available copies value'));
  }

  next();
}

module.exports = validateMovie;
