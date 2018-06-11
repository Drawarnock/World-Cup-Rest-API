const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const usersController = require('../controllers/users');

router.get('/', checkAuth, usersController.get_all_users);
router.post('/login', usersController.login_user );
router.post('/signup', usersController.signup_user);
router.delete('/:userId', checkAuth, usersController.delete_user);

module.exports = router;