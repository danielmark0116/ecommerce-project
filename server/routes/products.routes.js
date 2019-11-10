const express = require('express');
const router = express.Router();
const passport = require('passport');
const productController = require('../controller/product.controller');

const isAdmin = require('../middleware/isAdmin');

router.get('/', productController.getPublished);

router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  isAdmin.checkIfUserIsAdmin,
  productController.getAll
); // for admin panel, not yet implemented

router.get('/cart', productController.getCart);

router.get('/:skip/:limit/filter?', productController.productsFilters);

router.get(
  '/all/:skip/:limit/filter?',
  passport.authenticate('jwt', { session: false }),
  isAdmin.checkIfUserIsAdmin,
  productController.productsAllFilters
); // for admin panel, not yet implemented

router.get('/:id', productController.getById);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin.checkIfUserIsAdmin,
  productController.postProduct
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin.checkIfUserIsAdmin,
  productController.editProduct
);

router.patch(
  '/publish/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin.checkIfUserIsAdmin,
  productController.publishProduct
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin.checkIfUserIsAdmin,
  productController.deleteProduct
);

module.exports = router;
