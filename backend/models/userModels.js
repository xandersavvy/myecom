const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



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
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//JWT Token
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
}


//compare password
userSchema.methods.correctPassword = async function(password) { 
    return await bcrypt.compare(password, this.password);
}

//generate and hash password token
userSchema.methods.getResetPasswordToken = function() {
  //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    //Set passwordtoken to expire in 20 minutes
    this.resetPasswordExpire = Date.now() + 20 * 60000;

    return resetToken;
}


module.exports = mongoose.model('User', userSchema);