const router = require('express').Router();

const {registerUser , getAllUsers, loginUser} = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/users/all', getAllUsers);

module.exports = router;