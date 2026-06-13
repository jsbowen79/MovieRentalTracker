const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

const availableMovieRules = () => {
  return [
    param('movieId')
      .notEmpty()
      .withMessage('Please Provide a movie Id.')
      .custom((value) => ObjectId.isValid(value))
      .withMessage('The movieId is invalid.')
      .bail(),

    body('availableCopies')
    .notEmpty()
    .withMessage("Please enter the number of available movies")
    .isNumeric()
    .withMessage("Please enter an integer.")
  ];
};

const validateAvailableMovie = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};


module.exports = {
  availableMovieRules,
  validateAvailableMovie
};
