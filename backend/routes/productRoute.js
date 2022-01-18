const { getAllProducts , createProduct } = require('../controllers/productController');

const router = require('express').Router(); //create a router

router.get('/products', getAllProducts ); //get all products


router.post('/products/new', createProduct ); //create new product

module.exports = router; //export the router