const router = require('express').Router();
const userController = require('../server/controllers/user')
const authMiddleware = require('./middlewares/auth');
const meetController = require('../server/controllers/meets')

// add the paths for register, login, me, and logout here

// REMOVE-START
router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);
// REMOVE-END

router.post('/new', meetController.postMeets);
router.get('/allmeets', meetController.getMeets);
router.delete('/:id', meetController.deleteMeet);


module.exports = router;