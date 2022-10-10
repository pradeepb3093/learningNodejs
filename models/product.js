const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
);

module.exports = class Product {
    
    constructor(title) {
        this.title = title
    }

    save() {
        
        fs.readFile(dataFilePath, (err, fileContent) => {
            let products = [];
            if(!err) {
                products = JSON.parse(fileContent)
            }
            products.push(this);

            fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })
    }

    static fetchAll(callBack) {
        fs.readFile(dataFilePath, (err, fileContent) => {
            if(err) {
                callBack([]);
            }
            callBack(JSON.parse(fileContent));
        });
    }
}