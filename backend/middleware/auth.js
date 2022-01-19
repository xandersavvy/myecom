const catchAsyncError = require("./catchAsyncError");
const errorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = catchAsyncError(
    async (req, res, next) => {
        const { token } = req.cookies;
        if (!token) return next(new errorHandler(401, "Unauthorized"));
        const { userId } = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
        if (!userId) return next(new errorHandler(401, "Unauthorized"));
        req.user = await User.findById(userId);
        next();
    }
) 

exports.isAdmin = catchAsyncError(
    async (req, res, next) => {
        if (req.user.role !== "admin") return next(new errorHandler(403, `Forbidden access`));
        next();
    }
)

