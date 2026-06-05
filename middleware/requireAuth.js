const NotAuthenticatedError = require('../errors/NotAuthenticatedError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

function requireAuth(req, res, next) {
  console.log('req.user:', req.user);
  console.log('session:', req.session);
  if (!req.user) {
    return next(new NotAuthenticatedError('Access denied. Please log in.'));
  }
  if (req.user.role != 'admin') {
    if (req.user._id.toString() !== req.params.userId) {
      return next(new NotAuthorizedError('Forbidden. You are not Authorized.'));
    }
  }
  next();
}

module.exports = requireAuth;
