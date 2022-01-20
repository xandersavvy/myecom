const router = require('express').Router();

const {registerUser , updateUserDetails  ,getAllUsers, loginUser, 
    logoutUser, forgotPassword, resetPassword, getUserDetails , deleteUser,
    getSingleUser , } = require('../controllers/userController');
const { isAdmin, isAuthenticatedUser } = require('../middleware/auth');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', isAuthenticatedUser, logoutUser);


router.post('/forgot-password', forgotPassword);

router.put('/reset-password/:resetToken', resetPassword);

router.put('/update-password', isAuthenticatedUser,  updatePassword);

router.get('/user/me', isAuthenticatedUser , getUserDetails );

router.put('/user/update', isAuthenticatedUser, updateUserDetails);


router.get('/users/all',isAuthenticatedUser, isAdmin, getAllUsers);

router.route('/user/:id').delete(isAuthenticatedUser, isAdmin, deleteUser)
                            .get(isAuthenticatedUser, isAdmin, getSingleUser)
                            .put(isAuthenticatedUser, isAdmin, updateUserDetails);


module.exports = router;