

//create a token and save and save it in the database

module.exports = sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 86400000
        ),
        httpOnly: true,
    };
    res.status(statusCode).cookie('token', token, options).json({
        status: 'success',
        user,
        token,
    });
}