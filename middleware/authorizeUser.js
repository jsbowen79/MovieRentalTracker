const NotAuthenticatedError = require('../errors/NotAuthenticatedError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

function authorizeUser(role) {
  console.log('in authorizeUser');
  return (req, res, next) => {
    console.log('role: ', role, 'User: ', req.user);
    if (!req.user) {
      return next(new NotAuthenticatedError('Access denied. Please log in.'));
    }
    console.log(req.user.role, '=', role);
    if (req.user.role !== role) {
      return next(
        new NotAuthorizedError('You are not authorized for this operation.')
      );
    }

    next();
  };
}

module.exports = authorizeUser;
