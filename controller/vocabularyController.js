/*eslint-env node */

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:1111@ds161939.mlab.com:61939/todo');

/*var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("We are connected");
  } else throw err;

});
*/

var wordScheme = new mongoose.Schema({
  word: String,
  translation: String,
  added: Number,
  correctTimes: Number,
  incorrectTimes: Number
});

var Words = mongoose.model('Words', wordScheme);

var urlEncoderParser = bodyParser.urlencoded({
  extended: false
});

module.exports = function(app) {

  app.get('/vocabulary', function(req, res) {
    Words.find({}, function(err, data) {
      if (err) throw err;
      res.render('vocabulary', {
        data: data
      });
    });
  });

  app.post('/vocabulary', urlEncoderParser, function(req, res) {
    var newWord = Words(req.body).save(function(err, data) {
      if (err) throw err;
      res.json();
    });
  });

  app.get('/vocabulary/manage', function(req, res) {
    Words.find({}, function(err, data) {
      if (err) throw err;
      res.render('manage', {
        data: data
      });
    }).sort('word');
  });

  app.post('/vocabulary/manage', urlEncoderParser, function(req, res) {
    Words.findOneAndUpdate({
      word: req.body.word
    }, req.body, {
      upsert: true
    }, function(err, doc) {
      if (err) throw err;
      res.json();
    });
  });

  app.post('/vocabulary/manage/del', urlEncoderParser, function(req, res) {
    Words.remove({
      word: req.body.word
    }, function(err) {
      if (err) throw err;
      res.json();
    });
  });

  app.get('/vocabulary/training', function(req, res) {
    Words.find({}, function(err, data) {
      if (err) throw err;
      res.render('training', {
        data: data
      });
    }).sort('correctTimes').sort('incorrectTimes');
  })

  app.post('/vocabulary/training/pick', urlEncoderParser, function(req, res) {
    var doc = req.body;

    Words.find({
      word: doc.word
    }, function(err, data) {
      if (doc.correctTimes) {
        doc.correctTimes = data[0].correctTimes + 1;
      } else {
        doc.incorrectTimes = data[0].incorrectTimes + 1;
      }

      Words.findOneAndUpdate({
        word: doc.word
      }, doc, {
        upsert: true
      }, function(err, doc) {
        if (err) throw err;
        res.json();
      });
    });
  });
};
