const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Something went wrong';

    res.status(err.statusCode).json({
        status: err.status,
        success: false,
        message: err.message,
        error: err.stack
    });
}