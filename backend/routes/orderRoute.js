const router = require('express').Router();
const catchAsyncError = require('../middleware/catchAsyncError');
const {createOrder, getSingleOrder, updateOrder 
    ,deleteOrder, getAllOrders, getUserOrders} = require('../controllers/orderController');
const {isAdmin , isAuthenticatedUser} = require('../middleware/auth');

router.post('/orders/create', isAuthenticatedUser , catchAsyncError(createOrder));

router.get('/orders', isAuthenticatedUser , !isAdmin ,catchAsyncError(getUserOrders));

router.get('orders/all', isAuthenticatedUser, isAdmin , catchAsyncError(getAllOrders));


router.route('/order/:id').get(isAuthenticatedUser ,isAdmin ,  catchAsyncError(getSingleOrder))
                         .put(isAuthenticatedUser , isAdmin , catchAsyncError(updateOrder))
                         .delete(isAuthenticatedUser , isAdmin , catchAsyncError(deleteOrder));







module.exports = router;