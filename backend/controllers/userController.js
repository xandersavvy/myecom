const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/sendToken');
const User = require('../models/userModels');


exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({
        name,  email, password, role
    });

    sendToken(newUser, 201, res);

})


// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) return next(
        new errorHandler(400,'Please provide email and password!'));

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    if(!user || !(await user.correctPassword(password, user.password))) return next(
        new errorHandler(401, 'Incorrect email or password'));
    // 3) If everything ok, send token to client
    sendToken(user, 200, res);
})





exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});