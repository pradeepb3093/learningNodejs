const express = require('express');
const productController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.addProduct);

router.get('/edit-product', productController.getEditProduct);

router.get('/products', productController.getAllProducts);

module.exports = router;

// exports.router = router;
