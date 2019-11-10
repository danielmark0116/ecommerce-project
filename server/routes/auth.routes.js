const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.controller');

router.post('/login/google', authController.loginUserGoogle);

router.post('/login/facebook', authController.loginUserFacebook);

module.exports = router;
