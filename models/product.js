const fs = require('fs');
const path = require('path');

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
    
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
                console.log(err);
            })
        });
    }

    static fetchAll(callBack) {
        getProductFromFile(callBack);
    }

    static fetchProductById(id, callBack) {
        getProductFromFile(products => callBack(products.find(p => p.id === id)));
    }

}