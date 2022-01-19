const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchAsyncError = require('../middleware/catchAsyncError');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [3, "Name should have more than 2 characters"],
      },
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
      },
      password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        maxLength: [30, "Password cannot exceed 30 characters"],
        select: false,
      },
      avatar: {
        public_id: {
          type: String,
          default: "",
        //   required: true,
        },
        url: {
          type: String,
          default: "",
            // required: true,
        },
      },
      role: {
        type: String,
        default: "user",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
      resetPasswordToken: String,
      resetPasswordExpire: Date,
});
//Password Encryption
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

//JWT Token
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
}


//compare password
userSchema.methods.correctPassword = catchAsyncError(async (candidatePassword, userPassword) => 
await bcrypt.compare(candidatePassword, userPassword));

module.exports = mongoose.model('User', userSchema);