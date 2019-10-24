const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.controller');

router.post('/login/:provider', authController.loginUser);

module.exports = router;
