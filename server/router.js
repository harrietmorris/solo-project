const router = require('express').Router();
const userController = require('../server/controllers/user')
const authMiddleware = require('./middlewares/auth');

// add the paths for register, login, me, and logout here

// REMOVE-START
router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);
// REMOVE-END

module.exports = router;