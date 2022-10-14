const express = require('express');
const productController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.addProduct);

router.get('/edit-product/:productId', productController.getEditProduct);

router.post('/edit-product', productController.postEditProduct);

router.get('/products', productController.getAllProducts);

router.post('/delete-product', productController.deleteProduct);

module.exports = router;

// exports.router = router;
