// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'form_db',
  port:3307,
  auth_plugin='mysql_native_password',

  
});

module.exports = connection;