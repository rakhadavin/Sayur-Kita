const mysql = require('mysql')

const dbSK = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "smartkids"
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "DaveStore"
})
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

module.exports = db,allowCrossDomain