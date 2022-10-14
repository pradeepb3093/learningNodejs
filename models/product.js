const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
const cart = require('./cart');

const dataFilePath = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
);

const getProductFromFile = callBack => {
        fs.readFile(dataFilePath, (err, fileContent) => {
            if(err) {
                return callBack([]);
            }
            callBack(JSON.parse(fileContent));
        });
    }

module.exports = class Product {
    
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        
        getProductFromFile(products => {
            if(this.id) {
                let index = products.findIndex(p => p.id === this.id);
                const updateProducts = [...products];
                updateProducts[index] = this;
                fs.writeFile(dataFilePath, JSON.stringify(updateProducts), (err) => {
                    console.log(err);
                });
            }else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
            
        });
    }

    static fetchAll(callBack) {
        getProductFromFile(callBack);
    }

    static fetchProductById(id, callBack) {
        getProductFromFile(products => callBack(products.find(p => p.id === id)));
    }

    static deleteById(id) {
        getProductFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(dataFilePath, JSON.stringify(updatedProducts), err => {
                if (!err) {
                Cart.deleteProduct(id, product.price);
                }
            });
        });
    }

}