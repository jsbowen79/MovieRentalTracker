const AppError = require('./AppError.js');

class NotAuthorizedError extends AppError {
  resource = null;
  constructor(message, resource) {
    super(message, 403);
    this.resource = resource;
  }
}

module.exports = NotAuthorizedError;
