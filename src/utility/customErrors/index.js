// index.js

const BadRequestError = require('./badRequestError')

const NotFoundError = require('./notFoundError')

const ForbiddenError = require('./forbiddenError')

module.exports = {
    BadRequestError,
    NotFoundError,
    ForbiddenError,
}
