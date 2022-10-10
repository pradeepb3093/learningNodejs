const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', 
    {  
        pageTitle: 'Add product',
        pageName: 'addProduct',
    });
};

exports.addProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getShop = (req, res, next) => {
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));
    Product.fetchAll((products) => {
        res.render('shop', {
            prods: products,
            pageTitle: 'My Shop',
            pageName: 'MyShop'
        });
    });
    
};