const orders = require('../models/orderModels');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');


 //create new order
exports.createOrder = async(req, res, next) => {

    const {  shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, 
        shippingPrice, totalPrice } = req.body;

    const order = await orders.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });
    if (!order) return next(new ErrorHandler(500, 'Order cannot be created'));
    res.status(201).json({
            status : 'success',
            message: 'Order created successfully',
            order: order
        });
}

//get single order
exports.getSingleOrder = async(req, res, next) => {
    const order = await orders.findById(req.params.id).populate('user', "name email");
    if (!order) return next(new ErrorHandler(500, 'Order not found'));
    res.status(200).json({
        status : 'success',
        order
    })
}


//get user orders

exports.getUserOrders = async(req, res, next) => {
    if(req.user.role === "admin") return next(new ErrorHandler(403, 'Bro You are Admin'));
    const features = new ApiFeatures(orders.find({ user: req.user._id }), req.query).filter().search().paginate();
    const orders = await features.query;
    if (!orders) return next(new ErrorHandler(500, 'Orders not found'));
    res.status(200).json({
        status : 'success',
        orders
    })
}

//get all orders -- admin
exports.getAllOrders = async(req, res, next) => {
    const features = new ApiFeatures(orders.find(), req.query).filter().search().paginate();
    const orders = await features.query;
    if (!orders) return next(new ErrorHandler(500, 'Orders not found'));
    res.status(200).json({
        status : 'success',
        orders
    })
}

// delete order -- admin
exports.deleteOrder = async(req, res, next) => {
    const order = await orders.findByIdAndDelete(req.params.id);
    if (!order) return next(new ErrorHandler(500, 'Order not found'));
    res.status(200).json({
        status : 'success',
        message: 'Order deleted successfully'
    })
}

// update order -- admin
exports.updateOrder = async(req, res, next) => {

    const order = await orders.findByIdAndUpdate(req.params.id, {
        orderStatus: req.body.orderStatus
    });
    if (!order) return next(new ErrorHandler(500, 'Order not found'));
    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (items) => {
          await updateStock(items.product, items.quantity);
        });
      }
    res.status(200).json({
        status : 'success',
        message: 'Order status updated successfully'
    })
}

// update stock 
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
  

//get order status
exports.getOrderStatus = async(req, res, next) => {
    const order = await orders.findById(req.params.id);
    if (!order) return next(new ErrorHandler(500, 'Order not found'));
    res.status(200).json({
        status : 'success',
        orderStatus: order.orderStatus
    })
}