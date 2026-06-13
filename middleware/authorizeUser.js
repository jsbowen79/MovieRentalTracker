const NotAuthenticatedError = require('../errors/NotAuthenticatedError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

function authorizeUser(role) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new NotAuthenticatedError('Access denied. Please log in.'));
    }
    if (req.user.role !== role) {
      return next(
        new NotAuthorizedError('You are not authorized for this operation.')
      );
    }

    next();
  };
}

module.exports = authorizeUser;
