const fs = require('fs');
const path = require('path');

const cartFilePath = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, price) {
        fs.readFile(cartFilePath, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};

            if(!err) {
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex((p) => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {...existingProduct, qty: existingProduct.qty+1};     
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else {
                updatedProduct = {id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = parseFloat((parseFloat(cart.totalPrice) + parseFloat(price)).toFixed(2));
            console.log(cart);
            fs.writeFile(cartFilePath, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(cartFilePath, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            );
            updatedCart.totalPrice =
                updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(cartFilePath, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getCart(cb) {
    fs.readFile(cartFilePath, (err, fileContent) => {
      
      if (err) {
        cb(null);
      } else {
        const cart = JSON.parse(fileContent);
        cb(cart);
      }
    });
  }
}