const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/sendToken');
const crypto = require('crypto');
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
            email: user.email,
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

// reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    //creating token hash

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    //if token is not valid or has expired
    if (!user) return next(new errorHandler(400, 'Invalid token'));

    if(req.body.password!== req.body.confirmPassword) return next(new errorHandler(400, 'Passwords do not match'));

    //set the new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res);  
    //send success response
});


//get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if(!user) return next(new errorHandler(404, 'User not found'));
    res.status(200).json({
        status: 'success',
            user
    })
})

//update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    //check current password
    const isPasswordMatch = await user.correctPassword(req.body.currentPassword);
    if(!isPasswordMatch) return next(new errorHandler(400, 'Current password is incorrect'));
    //check if new password is same as current password
    if(req.body.newPassword === req.body.currentPassword) return next(new errorHandler(400, 'New password must be different from current password'));
    //set new password
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})


//update user details
exports.updateUserDetails = catchAsyncError(async (req, res, next) => {
    
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!user) return next(new errorHandler(404, 'User not found'));

    res.status(200).json({
        status: 'success',
        user
    })
})


//get All user admin
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

//get single user 
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) return next(new errorHandler(404, 'User not found'));
    res.status(200).json({
        status: 'success',
            user
    });
});


//update single user admin
exports.updateSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if(!user) return next(new errorHandler(404, 'User not found'));
    res.status(200).json({
        status: 'success',
        user
    });
});


//delete user --admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = User.findById(req.params.id);
    if(!user) return next(new errorHandler(404, 'User not found'));
    else await User.findByIdAndDelete(req.params.id);
    
    res.status(204).json({
        status: 'success',
        data: null
    })
})

//update user role --admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, {
        new: true,
        runValidators: true
    });
    if(!user) return next(new errorHandler(404, 'User not found'));
    res.status(200).json({
        status: 'success',
        user
    });
}); 
