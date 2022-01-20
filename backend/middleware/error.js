const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    
    let statusCode = err.statusCode||500;
    let message = err.message||'Something went wrong';
    switch(err.name) {
        case 'CastError':
            statusCode = 400;
            message = 'Invalid ID';
            break;
        case 'ValidationError':
            const messages = Object.values(err.errors).map(val => val.message);
            statusCode = 400;
            message = messages;
            break;
        case 'JsonWebTokenError':
            statusCode = 401;
            message = 'Invalid token';
            break;
        case 'TokenExpiredError':
            statusCode = 401;
            message = 'Token expired';
            break;
        case 'PermissionError':
            statusCode = 403;
            message = 'Permission denied';
            break;
        case 'AuthenticationError':
            statusCode = 401;
            message = 'Authentication failed';
            break;
        case 'ForbiddenError':
            statusCode = 403;
            message = 'Forbidden';
            break;
        case 'BadRequestError':
            statusCode = 400;
            message = 'Bad request';
            break;
        case 'NotFoundError':
            statusCode = 404;
            message = 'Not found';
            break;
        case 'ConflictError':
            statusCode = 409;
            message = 'Conflict';
            break;
        case 'InternalServerError':
            statusCode = 500;
            message = 'Internal server error';
            break;
        default:
            statusCode = err.statusCode||500;
            message = err.message||'Something went wrong';
            break;
    }


    //duplicate key error
    if (err.code === 11000) {
        const message = Object.keys(err.keyValue)[0] + ' already exists';
        err = new ErrorHandler(400, message);
    }else{
        err = new ErrorHandler(statusCode, message);
    }



    res.status(err.statusCode).json({
        status: err.status,
        success: false,
        message: err.message,
        error: err.stack
    });
}