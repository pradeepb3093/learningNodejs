const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ShopNodeApp',
});

module.exports = pool.promise();