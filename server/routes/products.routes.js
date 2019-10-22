const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

router.get('/', productController.getPublished);

router.get('/all', productController.getAll);

router.get('/cart', productController.getCart);

// router.get('/range/:start/:limit', productController.getRangeProducts);

// router.get('/all/range/:start/:limit', productController.getRangeAllProducts);

router.get('/:skip/:limit/filter?', productController.productsFilters);

router.get('/all/:skip/:limit/filter?', productController.productsAllFilters);

router.get('/:id', productController.getById);

router.post('/', productController.postProduct);

router.put('/:id', productController.editProduct);

router.patch('/publish/:id', productController.publishProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
