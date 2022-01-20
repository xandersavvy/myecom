const catchAsyncError = require("../middleware/catchAsyncError")
const nodemailer = require("nodemailer")



exports.sendEmail = catchAsyncError(async (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }})
    const mailOptions = {
        from: `${process.env.EMAIL_FROM}`,
        to: options.email, // list of receivers
        subject: options.subject,   // Subject line
        text: options.message, // plain text body
    }
    return await transporter.sendMail(mailOptions)
});