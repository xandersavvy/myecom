const { isAuthenticatedUser } = require('../middleware/auth');

const router = require('express').Router();


const {processPayment} = require('../controllers/paymentController');

router.post("/payment/process",isAuthenticatedUser,processPayment);

router.post("/payment/sendStripeApiKey",isAuthenticatedUser,sendStripeApiKey);

module.exports = router;