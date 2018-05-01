var bodyParser = require('body-parser');
var data = [
    {
        word: 'Cat',
        translation: 'kittedawdddddddddddddddd ddddddddddddddddddddddwan',
        isNew: true,
        added: Date.parse(new Date()),
        correctTimes: 0,
        incorrectTimes: 0
    },
    {
        word: 'dog',
        translation: 'puppy',
        isNew: true,
        added: Date.parse(new Date()),
        correctTimes: 0,
        incorrectTimes: 0
    }
];

var urlEncoderParser = bodyParser.urlencoded({
    extended: false
});

module.exports = function(app) {

    app.get('/vocabulary', function(req, res) {
        res.render('vocabulary', {data: data});
    });

    app.post('/vocabulary', urlEncoderParser, function(req, res) {
        res.json();
    });
};