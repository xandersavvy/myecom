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
    if (!email || !password) return next(new errorHandler(400,'Please provide email and password!'));

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    if(!user) return next(new errorHandler(401, 'Incorrect email'));
    const isPasswordMatch = await user.correctPassword(password);
    if(!isPasswordMatch) return next(new errorHandler(401, 'Incorrect email or password'));
    // 3) If everything ok, send token to client
    sendToken(user, 200, res);
})


//logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).status(200).json({
        status: 'success',
        data: {}
    })
})

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new errorHandler(404, 'There is no user with this email address'));
    const resetToken = user.getResetPasswordToken(); // get token
    await user.save({ validateBeforeSave: false }); // save token to DB
    // set the link to reset password (forgot-password)
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetURL}`;

    try {

        await sendEmail({
            email: user.email;
            subject: 'Password reset token',
            message: message
            
        })

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email - ' + user.email
        })


    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.save({ validateBeforeSave: false });
        return next(new errorHandler(500, 'Internal Server Error'));
    }
});
















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