const catchAsyncError = require("./catchAsyncError");

const isAuthenticatedUser = catchAsyncError(
    async (req, res, next) => {
        const token = req.cookie;
        if (req.user.role !== "admin") {
            return next(
                new errorHandler(
                    403,
                    "You are not authorized to access this route"
                )
            );
        }
        next();
    }
) 