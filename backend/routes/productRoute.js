const { getAllProducts , createProduct, updateProduct ,deleteProduct, getProductById } = require('../controllers/productController');

const router = require('express').Router(); //create a router

const { isAuthenticatedUser } = require('../middleware/auth');

router.get( '/',isAuthenticatedUser,getAllProducts)




router.post('/products/new', createProduct ); //create new product

router.route('/products/:id')
        .get(getProductById)
        .put(updateProduct )
        .delete(deleteProduct )

        //crud on products

module.exports = router; //export the router