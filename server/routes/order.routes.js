const express = require('express');
const router = express.Router();
const passport = require('passport');

const orderController = require('../controller/order.controller');

// api/order
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  orderController.getOrderById
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  orderController.createOrder
);

module.exports = router;
