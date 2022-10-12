const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'My Shop',
            path: '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.fetchProductById(prodId, p => {
        res.render('shop/product-detail', {
            product: p,
            pageTitle: 'Product detail',
            path: '/products'
        });
    });
};

exports.getIndex = (req, res, next) => {
     Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Product info',
            path: '/product/info'
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart',
    {
        pageTitle: 'Cart',
        path: '/cart'
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders',
    {
        pageTitle: 'orders',
        path: '/orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout',
    {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};
