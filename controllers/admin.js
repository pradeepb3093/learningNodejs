const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', 
    {  
        pageTitle: 'Add product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.addProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const productId = req.params.productId;
    Product.fetchProductById(productId, product => {
        if(!product) {
            return res.redirect('/');
        }else {
            res.render('admin/edit-product', 
            {  
                pageTitle: 'Edit product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        }
    });
    
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const updateProduct = new Product(id, title, imageUrl, description, price);
    updateProduct.save();
    res.redirect('/admin/products');
};

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'All Products',
            path: '/admin/products'
        });
    });
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products');
};

