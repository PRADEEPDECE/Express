// routes/users.js
var express = require('express');
var router = express.Router();
const db = require('../db');

// Display list of all users
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching users');
      return;
    }
    res.render('users', { title: 'User List', users: results });
  });
});

// Display user create form on GET
router.get('/create', function(req, res, next) {
  res.render('user_form', { title: 'Create User' });
});

// Handle user create on POST
router.post('/create', function(req, res, next) {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating user');
      return;
    }
    res.redirect('/users');
  });
});

// Display user delete form on GET
router.get('/:id/delete', function(req, res, next) {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', userId, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching user');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.render('user_delete', { title: 'Delete User', user: results[0] });
  });
});

// Handle user delete on POST
router.post('/:id/delete', function(req, res, next) {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', userId, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting user');
      return;
    }
    res.redirect('/users');
  });
});

module.exports = router;
