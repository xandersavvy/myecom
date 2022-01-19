const products = require('../models/productsModels');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');
let ErrorHandler = require('../utils/errorHandler');



//create new product admin
exports.createProduct = catchAsyncError( async(req, res, next) => {
    const product = await products.create(req.body);
    if (!product) return next(new ErrorHandler(500, 'Product cannot be created'));
    res.status(201).json({
            message: 'Product created successfully',
            product: product
        });
});

//get all products
exports.getAllProducts = catchAsyncError( async(req, res) => {
    const apiFeatures = new ApiFeatures(products, req.query).search().filter(); 
    let allProducts = await apiFeatures.query;
    res.status(200).json({
        message: 'All products',
        success: true,
         allProducts,
        });
});
//update products admin
exports.updateProduct = catchAsyncError( async(req, res) => {
    let product = await products.findById(req.params.id);
    if (!product) return next(new ErrorHandler(500, 'Product not found'));
    product = await products.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
            message: 'Product updated successfully',
            product: product });
});

//delete product admin

exports.deleteProduct = catchAsyncError( async(req, res) => {
    const product = await products.findByIdAndDelete(req.params.id);
    if (!product) return next(new ErrorHandler(500, 'Product not found'));
    res.status(200).json({
        message: 'Product deleted successfully',
        product: product
    });
    
});

//get product by id
exports.getProductById = catchAsyncError( async(req, res) => {
    const product = await products.findById(req.params.id);
    if (!product) return next(new ErrorHandler(500, 'Product not found'));
    res.status(200).json({
        message: 'Product found',
        product: product
    })
})