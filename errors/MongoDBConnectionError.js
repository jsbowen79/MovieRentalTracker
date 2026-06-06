const AppError = require('./AppError.js');

class MongoDBConnectionError extends AppError {
  resource = null;
  constructor(message, resource) {
    super(message, 500);
    this.resource = resource;
  }
}

module.exports = MongoDBConnectionError;
