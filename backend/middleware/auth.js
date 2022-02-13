const catchAsyncError = require("./catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModels");

exports.isAuthenticatedUser = catchAsyncError(
    async (req, res, next) => {
        const { token } = req.cookies;
        if (!token) return next(new errorHandler(401, "Unauthorized"));
        const data = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
        if (!data.id) return next(new errorHandler(401, "Unauthorized"));
        req.user = await User.findById(data.id);
        next();
    }
) 

exports.isAdmin = catchAsyncError(
    async (req, res, next) => {
        if (req.user.role !== "admin") return next(new errorHandler(403, `Forbidden access for ${req.user.role}`));
        next();
    }
)

