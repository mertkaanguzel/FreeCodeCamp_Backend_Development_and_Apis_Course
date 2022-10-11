require('dotenv').config();

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use(bodyParser.urlencoded({extended : false}));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    //res.send('Hello Express');
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
    let message = process.env.MESSAGE_STYLE == 'uppercase' ? 'HELLO JSON' : 'Hello json';
    res.json({'message' : message});
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({'time' : req.time});
});


app.get('/:word/echo', function(req, res) {
    let word = req.params.word;
    res.json({'echo' : word});
});

app.route('/name')
    .get((req, res) => {
        const fullName = req.query.first + ' ' + req.query.last;
        res.json({name : fullName});
    })
    .post(function(req, res) {
        let string = req.body.first + " " + req.body.last;
        res.json({ name: string });
      });








































 module.exports = app;
