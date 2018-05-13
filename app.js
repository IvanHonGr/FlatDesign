var express = require('express');
var vocabularyController = require('./contoller/vocabularyController');

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

app.listen(3000);