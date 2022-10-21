const Product = require('../models/product');
// const Cart = require('../models/cart');
// const db = require('../util/database');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then((products) => {
      console.log(products);
      res.render('shop/product-list', {
            prods: products,
            pageTitle: 'My Shop',
            path: '/products'
        });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Product detail',
            path: '/products'
        });
      })
      .catch(err => console.log(err));

};

exports.getIndex = (req, res, next) => {
  // res.render('shop/index', {
  //           prods: [],
  //           pageTitle: 'Product info',
  //           path: '/product/info'
  //       });
  Product.fetchAll()
    .then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Product info',
            path: '/product/info'
        });
    })
    .catch(err => console.log(err));
};

// exports.getCart = (req, res, next) => {
//   req.user.getCart()
//     .then(cart => {
//       // console.log(cart);
//       cart.getProducts()
//         .then(products => {
//           res.render('shop/cart', {
//             path: '/cart',
//             pageTitle: 'Your Cart',
//             products: products
//           });
//         })
//         .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err));
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user.getCart()
//     .then(cart => {
//       return cart.getProducts({where: {id: prodId}});
//     })
//     .then(products => {
//       return products[0].cartItem.destroy();
//     })
//     .then(r => res.redirect('/cart'))
//     .catch(err => console.log(err));
// };

// exports.addToCart = (req, res, next) => {
//   const productId = req.body.productId;
//   let fetchedCart;
//   let newQty = 1;
//   req.user.getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts({where: {id: productId}})
//     })
//     .then(products => {
//       let product;
//       if(products.length > 0) {
//         product = products[0];
//       }
      
//       if(product) {
//         const oldQty = product.cartItem.quantity;
//         newQty += oldQty; 
//         return product;
//       }
//       return Product.findByPk(productId)
//     })
//     .then(product => {
//       return fetchedCart.addProduct(product, {
//         through: {quantity: newQty}
//       });
//     })
//     .then(r => res.redirect('/cart'))
//     .catch(err => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//     res.render('shop/orders',
//     {
//         pageTitle: 'orders',
//         path: '/orders'
//     });
// };

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout',
//     {
//         pageTitle: 'Checkout',
//         path: '/checkout'
//     });
// };
