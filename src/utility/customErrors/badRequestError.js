// utility/customErrors.js
class BadRequestError extends Error {
    constructor(message, statusCode, errors) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
    }
  }
  
  module.exports = BadRequestError;
  