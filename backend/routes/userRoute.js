const router = require('express').Router();

const {registerUser , getAllUsers, loginUser, logoutUser, forgotPassword, resetPassword} = require('../controllers/userController');
const { isAdmin, isAuthenticatedUser } = require('../middleware/auth');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', isAuthenticatedUser, logoutUser);


router.post('/forgot-password', forgotPassword);

router.put('/reset-password/:resetToken', resetPassword);

router.get('/users/all',isAuthenticatedUser, isAdmin, getAllUsers);

module.exports = router;