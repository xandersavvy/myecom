const { isAuthenticatedUser } = require('../middleware/auth');


const router = require('express').Router();


const {processPayment, sendStripeApiKey } = require('../controllers/paymentController');

router.post("/process",isAuthenticatedUser,processPayment);

router.post("/sendStripeApiKey",isAuthenticatedUser,sendStripeApiKey);

module.exports = router;