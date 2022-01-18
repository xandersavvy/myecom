const products = require('../models/productsModels');


//create new product admin
exports.createProduct = async(req, res, next) => {
    const product = await products.create(req.body);
    if (product) {
        res.status(201).json({
            message: 'Product created successfully',
            product: product
        });
    }
};

//get all products
exports.getAllProducts = async(req, res) => {
    const allProducts = await products.find();
    res.status(200).json({
        message: 'All products',
        allProducts: allProducts
        });
}
//update products admin
exports.updateProduct = async(req, res) => {
    let product = await products.findById(req.params.id);
    if (product) {
        product = await products.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json({
            message: 'Product updated successfully',
            product: product
        });
    } else {
        res.status(404).json({
            message: 'Product not found'
        });
    }

}

//delete product admin

exports.deleteProduct = async(req, res) => {
    const product = await products.findByIdAndDelete(req.params.id);
    if (product) {
        res.status(200).json({
            message: 'Product deleted successfully',
            product: product
        });
    } else {
        res.status(404).json({
            message: 'Product not found'
        });
    }
}

//get product by id
exports.getProductById = async(req, res) => {
    const product = await products.findById(req.params.id);
    if (product) {
        res.status(200).json({
            message: 'Product found',
            product: product
        });
    } else {
        res.status(404).json({
            message: 'Product not found'
        });
    }
}