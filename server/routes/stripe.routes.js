const express = require('express');
const router = express.Router();
const passport = require('passport');

const stripeController = require('../controller/stripe.controller');

// api/stripe/startpayment
router.post(
  '/startpayment',
  passport.authenticate('jwt', { session: false }),
  stripeController.startPayment
);

router.post(
  '/redirect/:id',
  passport.authenticate('jwt', { session: false }),
  stripeController.redirect
);

module.exports = router;
