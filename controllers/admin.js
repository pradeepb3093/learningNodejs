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

    const product = new Product(title, imageUrl, price, description);
    product.save()
    .then(result => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const productId = req.params.productId;
    Product.findById(productId)
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
   
    const updatedProduct = new Product(title, imageUrl, price, description, id);
    updatedProduct.save()
        .then(result => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll()
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
    Product.deleteById(productId)
        .then(result => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};
