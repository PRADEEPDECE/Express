// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mysqldbs',
  port:3307,
  

});

connection.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

module.exports = connection;
