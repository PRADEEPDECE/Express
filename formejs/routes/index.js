var express = require('express');
var router = express.Router();
var connection = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Application Form' });
});

router.post('/submit', function(req, res, next) {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)';
  connection.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error submitting form:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Form submitted successfully!');
      res.send('Form submitted successfully!');
    }
  });
});

module.exports = router;