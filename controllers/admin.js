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

    
    // Product.create({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description,
    // })
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
    })
    .then(result => res.redirect('/'))
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const productId = req.params.productId;
    Product.findByPk(productId)
    .then((product) => {
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
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.findByPk(id)
        .then(product => {
            product.title = title;
            product.imageUrl = imageUrl;
            product.price = price;
            product.description = description;
            return product.save();
        })
        .then(result => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};

exports.getAllProducts = (req, res, next) => {
    req.user.getProducts()
    .then((products) => {
      res.render('admin/products', {
            prods: products,
            pageTitle: 'All Products',
            path: '/admin/products'
        });
    })
    .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.destroy({where: {id: productId}})
        .then(result => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};

