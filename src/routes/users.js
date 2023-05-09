const express = require('express');
const router = express.Router();
const UsersController = require('../app/controllers/UsersController');

const verifyToken = require('../app/middlewares/auth');

router.post('/login', UsersController.login);
router.post('/signup', UsersController.signup);
router.post('/regentoken', UsersController.regenToken);
router.delete('/logout', verifyToken, UsersController.logout);

module.exports = router;