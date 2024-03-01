var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'my_db',
  port:3307
});

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM demo', function (error, results, fields) {
    if (error) throw error;
    res.render('index', { title: 'Demo', demo1: results });
  });
});
module.exports = router;