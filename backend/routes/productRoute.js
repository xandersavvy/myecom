const { getAllProducts , createProduct, updateProduct ,deleteProduct, getProductById } = require('../controllers/productController');

const router = require('express').Router(); //create a router

const { isAuthenticatedUser, isAdmin } = require('../middleware/auth');

router.get( '/',isAuthenticatedUser,getAllProducts)




router.post('/products/new',isAdmin, createProduct ); //create new product

router.route('/products/:id')
        .get(getProductById)
        .put(isAuthenticatedUser,isAdmin, updateProduct )
        .delete(isAuthenticatedUser,isAdmin, deleteProduct )

        //crud on products

module.exports = router; //export the router