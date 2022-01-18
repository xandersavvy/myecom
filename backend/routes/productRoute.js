const { getAllProducts , createProduct, updateProduct ,deleteProduct, getProductById } = require('../controllers/productController');

const router = require('express').Router(); //create a router

router.get('/products', getAllProducts ); //get all products




router.post('/products/new', createProduct ); //create new product

router.get('/products/:id', getProductById ); //get product by id

router.put('/products/:id', updateProduct )//update a product

router.delete('/products/:id', deleteProduct )//delete a product

module.exports = router; //export the router