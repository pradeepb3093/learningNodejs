const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


class Product {
    
    constructor(title, imageUrl, price, description, id) {
        this._id = (id) ? new mongodb.ObjectId(id) : null;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        let dbOps;
        // console.log(this);
        if(this._id) {
            dbOps = db.collection('product').updateOne(
                {_id: this._id},
                {$set: this}
            );
        }else {
            dbOps = db.collection('product').insertOne(this);
        }
        return dbOps
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('product').find().toArray()
        .then(products => {
            return products;
        })
        .catch(err => console.log(err));
    }

    static findById(productId) {
        const db = getDb();
        return db.collection('product')
        .find({_id: new mongodb.ObjectId(productId)})
        .next()
        .then(product => {
            console.log(product)
            return product;
        })
        .catch(err => console.log(err));
    }

    static deleteById(productId) {
        const db = getDb();
        return db.collection('product')
            .deleteOne({_id: new mongodb.ObjectId(productId)})
            .then(r => console.log('deleted'))
            .catch(err => console.log(err));
    }
}

module.exports = Product;