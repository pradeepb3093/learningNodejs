const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));
    console.log('shop.js', adminData.products);
    res.render('shop', {prods: adminData.products, docTitle: ' Shop'});
});

module.exports = router;