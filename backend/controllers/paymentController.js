const catchAsyncError = require('../utils/catchAsyncError');

//set up stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const custPaymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',
        payment_method_types: ['card'],
        receipt_email: req.user.email,
        description: 'Payment for order',
        metadata: {integration_check: 'accept_a_payment'}
    })
    res.status(200).json({
        status: 'success',
        clientSecret: custPaymentIntent.client_secret
    })
})

exports.sendStripeApiKey = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
}