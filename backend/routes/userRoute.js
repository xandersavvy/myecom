const router = require('express').Router();

const {registerUser , updateUserDetails  ,getAllUsers, loginUser, 
    logoutUser, forgotPassword, resetPassword, getUserDetails , deleteUser,
    getSingleUser ,updatePassword , updateUserRole } = require('../controllers/userController');
const { isAdmin, isAuthenticatedUser } = require('../middleware/auth');

router.route('/register').post( registerUser);

router.route('/login').post( loginUser);

router.route('/logout').post(isAuthenticatedUser, logoutUser);


router.route('/forgot-password').post( forgotPassword);

router.route('/reset-password/:token').put( resetPassword);

router.route('/update-password').put( isAuthenticatedUser,  updatePassword);

router.route('/user/me').get(isAuthenticatedUser , getUserDetails );


router.route('/users/all').get(isAuthenticatedUser, isAdmin, getAllUsers);

router.route('/user/:id').delete(isAuthenticatedUser, isAdmin, deleteUser)
                            .get(isAuthenticatedUser, isAdmin, getSingleUser)
                            .put(isAuthenticatedUser,  updateUserDetails);



router.route('user/:id/role').put( isAuthenticatedUser, isAdmin, updateUserRole);

module.exports = router;