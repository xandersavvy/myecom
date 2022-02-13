const router = require('express').Router();
const catchAsyncError = require('../middleware/catchAsyncError');
const {createOrder, getSingleOrder, updateOrder 
    ,deleteOrder, getAllOrders, getUserOrders} = require('../controllers/orderController');
const {isAdmin , isAuthenticatedUser} = require('../middleware/auth');


router.route('/').get( isAuthenticatedUser ,catchAsyncError(getUserOrders))
                .post( isAuthenticatedUser , catchAsyncError(createOrder));

router.get('/all', isAuthenticatedUser, isAdmin , catchAsyncError(getAllOrders));


router.route('/:id').get(isAuthenticatedUser ,isAdmin ,  catchAsyncError(getSingleOrder))
                         .put(isAuthenticatedUser , isAdmin , catchAsyncError(updateOrder))
                         .delete(isAuthenticatedUser , isAdmin , catchAsyncError(deleteOrder));







module.exports = router;