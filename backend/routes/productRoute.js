const { getAllProducts , createProduct, updateProduct ,deleteProduct, getProductById,
        createOrUpdateProductReview, deleteProductReview ,
        getProductReviewsById} = require('../controllers/productController');

const router = require('express').Router(); //create a router

const { isAuthenticatedUser, isAdmin } = require('../middleware/auth');

router.route( '/').get(isAuthenticatedUser,getAllProducts)




router.route('/products/new').post(isAdmin, createProduct ); //create new product

router.route('/products/:id')
        .get(getProductById)
        .put(isAuthenticatedUser,isAdmin, updateProduct )
        .delete(isAuthenticatedUser,isAdmin, deleteProduct )

        //crud on products


//reviews

//edit reviews
router.route("/products/:id/reviews")
        .put(isAuthenticatedUser,createOrUpdateProductReview)
        .post(isAuthenticatedUser,createOrUpdateProductReview)
        .get(getProductReviewsById)
        .delete(isAuthenticatedUser,deleteProductReview)


module.exports = router; //export the router