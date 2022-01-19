const router = require('express').Router();

const {registerUser , getAllUsers, loginUser, logoutUser} = require('../controllers/userController');
const { isAdmin, isAuthenticatedUser } = require('../middleware/auth');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/users/all',isAuthenticatedUser, isAdmin, getAllUsers);

module.exports = router;