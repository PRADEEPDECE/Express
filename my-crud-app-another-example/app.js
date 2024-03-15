// app.js
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'crud_app',
  port:3307,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/users', users);

// Display all todos
app.get('/todos', (req, res) => {
  connection.query('SELECT * FROM todos', (err, rows) => {
    if (err) throw err;
    res.render('todos', { todos: rows });
  });
});

// Add a todo
app.post('/todos/add', (req, res) => {
  const { title, description } = req.body;
  const todo = { title, description };
  connection.query('INSERT INTO todos SET ?', todo, (err, result) => {
    if (err) throw err;
    res.redirect('/todos');
  });
});

// Update a todo
app.post('/todos/update/:id', (req, res) => {
  const { title, description, completed } = req.body;
  const todo = { title, description, completed: completed ? 1 : 0 };
  connection.query('UPDATE todos SET ? WHERE id = ?', [todo, req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect('/todos');
  });
});

// Delete a todo
app.get('/todos/delete/:id', (req, res) => {
  connection.query('DELETE FROM todos WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect('/todos');
  });
});

module.exports = app;
