/*eslint-env node */

var express = require('express');
var vocabularyController = require('./controller/vocabularyController');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./assets'));

vocabularyController(app);

app.get('/calc', function(req, res) {
  res.render('calc');
});

app.get('/tetris', function(req, res) {
  res.render('tetris');
});

app.get('', function(req, res) {
  res.render('calc');
});

app.get('/theory', function(req, res) {
  res.render('theory/theory');
});

app.get('/photo', function(req, res) {
  res.render('photo/photo');
});

app.listen(3000);
