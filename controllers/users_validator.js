const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const UserDataError = require('../errors/UserDataError');

const validUserRules = () => {
  return [
    body('username')
      .notEmpty()
      .isAlpha('en-US', { ignore: ' ' })
      .withMessage('Please Provide a username.')
      .trim()
      .escape()
      .bail(),

    body('email')
      .notEmpty()
      .withMessage('Please Provide an email.')
      .isEmail()
      .normalizeEmail()
      .escape()
      .trim()
      .bail(),

    body('githubId').optional().trim().bail(),

    body('profileUrl').optional().isURL().trim().escape().bail(),

    body('address').optional().trim().escape().bail(),

    body('phone')
      .optional()
      .matches(/^([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
      .withMessage('Phone number must be in ###-###-#### format.')
      .bail(),
  

    body('role')
      .notEmpty()
      .custom((value) => {
        if (value == 'user' || value == 'admin') return true;
        else return false;
      })
      .trim()
      .bail(),
  ];
};

const validateNew = (req, res, next) => {
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

const updateUserRules = () => {
  return [
    param('userId')
      .notEmpty()
      .custom((value) => ObjectId.isValid(value))
      .withMessage('The userId is invalid.')
      .trim()
      .bail(),

    body('username')
      .optional()
      .isAlpha('en-US', { ignore: ' ' })
      .withMessage('Please Provide a username.')
      .trim()
      .escape()
      .bail(),

    body('email')
      .optional()
      .isEmail()
      .withMessage('Please Provide an Email in this field.')
      .normalizeEmail()
      .escape()
      .trim()
      .bail(),

    body('githubId').optional().trim().bail(),

    body('profileUrl').optional().isURL().trim().escape().bail(),

    body('address').optional().trim().escape().bail(),

    body('phone')
      .optional()
      .matches(/^([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
      .withMessage('Phone number must be in ###-###-#### format.')
      .bail(),


    body('role')
      .optional()
      .custom((value) => {
        if (value == 'user' || value == 'admin') return true;
        else return false;
      })
      .trim()
      .bail(),
  ];
};

const validateUpdate = (req, res, next) => {
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
  validateNew,
  validateUpdate,
  validUserRules,
  updateUserRules,
};
