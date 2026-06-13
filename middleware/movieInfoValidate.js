const { body, validationResult } = require('express-validator');
const validationError = require('../errors/ValidationError');
const validate = {};

validate.movieInfoRules = () => {
  return [
    body('title').notEmpty().withMessage('Title is required'),
    body('director').notEmpty().withMessage('Director is required'),
    body('releaseYear')
      .notEmpty()
      .withMessage('Release year is required')
      .isLength({ min: 4, max: 4 })
      .withMessage('Release year must be a 4-digit integer')
      .isNumeric()
      .withMessage('Release year must be a number'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('main_actors')
      .isArray({ min: 1 })
      .withMessage('Main actors must be an array with at least one actor'),
    body('length_minutes')
      .isInt({ min: 1 })
      .withMessage('Length in minutes must be a positive integer'),
    body('studio').notEmpty().withMessage('Studio is required'),
    body('language').notEmpty().withMessage('Language is required'),
  ];
};

validate.validateMovieInfo = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new validationError('Movie information validation failed', errors.array())
    );
  }
  next();
};

module.exports = validate;
