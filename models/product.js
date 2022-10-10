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
    
    constructor(title) {
        this.title = title
    }

    save() {
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
}