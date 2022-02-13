const router = require('express').Router();

const {registerUser , updateUserDetails  ,getAllUsers, loginUser, 
    logoutUser, forgotPassword, resetPassword, getUserDetails , deleteUser,
    getSingleUser ,updatePassword , updateUserRole } = require('../controllers/userController');
const { isAdmin, isAuthenticatedUser } = require('../middleware/auth');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', isAuthenticatedUser, logoutUser);


router.post('/password/forget', forgotPassword);

router.put('/password/reset/:token', resetPassword);

router.put('/password', isAuthenticatedUser,  updatePassword);

router.get('/me', isAuthenticatedUser , getUserDetails );


router.get('/all',isAuthenticatedUser, isAdmin, getAllUsers);

router.route('/:id').delete(isAuthenticatedUser, isAdmin, deleteUser)
                            .get(isAuthenticatedUser, isAdmin, getSingleUser)
                            .put(isAuthenticatedUser,  updateUserDetails);



router.put('user/:id/role', isAuthenticatedUser, isAdmin, updateUserRole);

module.exports = router;