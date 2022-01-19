const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Something went wrong';


    //wrong mongodb id error
    if (err.name === 'CastError') {
        err = new ErrorHandler(400, 'Product not found');
    }

    
    res.status(err.statusCode).json({
        status: err.status,
        success: false,
        message: err.message,
        error: err.stack
    });
}