const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {pageTitle: 'Add product', pageName: 'addProduct', activeProduct: true, productCSS: true, formCSS: true});
});

router.post('/add-product', (req, res, next) => {
    products.push({'title': req.body.title});
    res.redirect('/');
});

// module.exports = router;

exports.router = router;
exports.products = products;