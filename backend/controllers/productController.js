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