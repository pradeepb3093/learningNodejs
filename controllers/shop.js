const Product = require('../models/product');
const Cart = require('../models/cart');

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
  Cart.getCart(cart => {
    if(cart) {
      Product.fetchAll(products => {
        const cartProducts = [];
        for (product of products) {
          const cartProductData = cart.products.find(
            prod => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts
        });
      });
    }else {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: []
      });
    }
      
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchProductById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.addToCart = (req, res, next) => {
    const productId = req.body.productId;
    
    Product.fetchProductById(productId, p => {
        Cart.addProduct(productId, p.price);
    });
    res.redirect('/cart');
}

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
