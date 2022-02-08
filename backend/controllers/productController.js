const products = require('../models/productsModels');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');
let ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');



//create new product admin
exports.createProduct = catchAsyncError( async(req, res, next) => {
    let images = [];
    const imagesLinks = [];


    typeof req.body.images === "string" ? images.push(req.body.images):images = req.body.images;

    

    images.map(async (image) => {
        const result = await cloudinary.v2.uploader.upload(image ,{folder: "products",});
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    });

    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    
    const product = await products.create(req.body);

    if (!product) return next(new ErrorHandler(500, 'Product cannot be created'));
    res.status(201).json({
            message: 'Product created successfully',
            product: product
        });
});

//get all products
exports.getAllProducts = catchAsyncError( async(req, res) => {
    const productCount = await products.countDocuments();
    const apiFeatures = new ApiFeatures(products, req.query).search().filter().paginate(); 

    let pagedProducts = await apiFeatures.query;
    let pagedProductCounts = pagedProducts.length;
    res.status(200).json({
        message: 'All products',
        success: true,
         pagedProducts,
            productCount,
            pagedProductCounts,
        });
});
//update products admin
exports.updateProduct = catchAsyncError( async(req, res) => {
    let product = await products.findById(req.params.id);
    if (!product) return next(new ErrorHandler(500, 'Product not found'));
    
    let images = [];

    typeof req.body.images === "string" ? images.push(req.body.images):images = req.body.images;

    if(images.length > 0){
        product.images.map(async (image) => {
            await cloudinary.v2.uploader.destroy(image.public_id);
        });


        const imagesLinks = [];

        images.map(async (image) => {
            const result = await cloudinary.v2.uploader.upload(image ,{folder: "products",});
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        });

        req.body.images = imagesLinks;
    }
    
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