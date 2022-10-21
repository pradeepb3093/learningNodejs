const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;

let _db;
// pwd - xS42fjglVO4KUEDT
const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://rootUser:xS42fjglVO4KUEDT@clusternodeapp.hfbpiwe.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('connected');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log('error');
        console.log(err);
        // throw err;
    });
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No databse found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
