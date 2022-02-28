    const { isAuthenticatedUser } = require('../middleware/auth');

const router = require('express').Router();


const {processPayment} = require('../controllers/paymentController');

router.route("/payment/process").post(isAuthenticatedUser,processPayment);

router.route("/payment/sendStripeApiKey").post(isAuthenticatedUser,sendStripeApiKey);

module.exports = router;