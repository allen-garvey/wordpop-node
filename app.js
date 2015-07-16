var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var ajaxSearchHandler = require('./models/request_to_url');

app.use(express.static('public_html'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var responseOptions = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};

app.get('/', function (req, res) {
    res.sendFile('views/homepage.html', responseOptions);
});

app.post('/data', function (req, res) {
    console.log(req.body);
    var reqUrl = ajaxSearchHandler.urlFromRequest(req.body);
    if(reqUrl.match(/^http:/)){
        http.get(reqUrl, function(searchResponse) {
            searchResponse.pipe(res);
        }); 
    }
    else{
        res.status(400).send('400 Bad request');
    }
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.status(404).send('404 not found');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Wordpop-node app listening at http://%s:%s', host, port);
});