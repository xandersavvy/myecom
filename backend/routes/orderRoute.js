const router = require('express').Router();
const catchAsyncError = require('../middleware/catchAsyncError');
const {createOrder, getSingleOrder, updateOrder 
    ,deleteOrder, getAllOrders, getUserOrders} = require('../controllers/orderController');
const {isAdmin , isAuthenticatedUser} = require('../middleware/auth');

router.route('/orders/create').post( isAuthenticatedUser , catchAsyncError(createOrder));

router.route('/orders').get(isAuthenticatedUser , !isAdmin ,catchAsyncError(getUserOrders));

router.route('orders/all').get( isAuthenticatedUser, isAdmin , catchAsyncError(getAllOrders));


router.route('/order/:id').get(isAuthenticatedUser ,isAdmin ,  catchAsyncError(getSingleOrder))
                         .put(isAuthenticatedUser , isAdmin , catchAsyncError(updateOrder))
                         .delete(isAuthenticatedUser , isAdmin , catchAsyncError(deleteOrder));







module.exports = router;