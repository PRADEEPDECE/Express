var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

// body parser is an npm library used to process data sent through
// HTTP request body - middleware - it's a function that holds the 
// requset obiect, the response object - respond to the server before
// the request

// Define Routes 

// refers to how an application's endpoints (URI) respond
// to client requests - All URLs are URIs but not all URIs
// are URLs (HTML XML JSON

// the app object includes get() post() put() and delete()

app.get('/', function(req, res) {
   // res.send('<html><body><h1>Hello World</h1></body></html>');
   res.sendFile(__dirname + '/index.html');
});

app.post('/submit-contact-data', function(req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName;
    res.send(name + ' Submitted succesfully');
});

app.put('/update-data', function(req, res) {
    res.send('PUT Request');
});

app.delete('/delete-data', function(req, res) {
    res.send('DELETE Request');
});

var server = app.listen(3000, function() {
    console.log('Node server is running');
});

