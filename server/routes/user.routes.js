const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controller/user.controller');

router.get(
  '/address',
  passport.authenticate('jwt', { session: false }),
  userController.getUserAddresses
);

router.post(
  '/address',
  passport.authenticate('jwt', { session: false }),
  userController.addUserAddress
);

module.exports = router;
