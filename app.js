var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var $ = require('cheerio');
var request = require('request');
var CLModel = require('./models/cl_model');

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
app.get('/cities-comparison', function (req, res) {
    res.sendFile('views/cities_comparison.html', responseOptions);
});

app.post('/data.json', function (req, res) {
    var reqUrl = CLModel.urlFromRequest(req.body);
    
    if(!reqUrl.match(/^http:/)){
        res.status(400).send('400 Bad request');
        return;
    }

    request(reqUrl, function(error, response, html){
        if (error){
            console.error(err);
            res.status(500).send('Could not connect to ' + reqUrl);
        }
        var parsedHTML = $.load(html);
        var posts = [];
        parsedHTML('a.hdrlnk').map(function(i, element) {
            var resultsLink = $(element);
            var title = resultsLink.text();
            var link = resultsLink.attr('href');
            //don't add links to nearby cities
            var postLink = link.match(/^http:/) ? null : link;

            posts.push({title : title, url: postLink});
        });
        res.json({posts: posts});
    });
});

function gotHTML(err, resp, html) {
    if (err){
        return console.error(err);
    }
    var parsedHTML = $.load(html);
    var posts = [];
    parsedHTML('a.hdrlnk').map(function(i, element) {
        var resultsLink = $(element);
        var title = resultsLink.text();
        var link = resultsLink.attr('href');
        //don't add links to nearby cities
        var postLink = null;
        if(!link.match(/^http:/)){
            postLink = link
        }
        posts.push({title : title, url: postLink});
    });
    return {posts: posts};
}

app.get('/data/cl.json', function (req, res) {
    res.send(CLModel.model);
});

app.get('/data/cl-postbody', function(req, res){
    // console.log("City requested: " + req.query.city);
    var reqUrlBase = CLModel.cityUrlFromCity(req.query.city);
    if(!reqUrlBase){
        res.status(400).send('400 Bad request');
    }
    //test required because if few results craigslist will give links to nearby cities
    var reqUrl = req.query.link.match(/^http:/) ? req.query.link : reqUrlBase + req.query.link;
    // console.log("Url requested: " + reqUrl);
    http.get(reqUrl, function(searchResponse) {
        searchResponse.pipe(res);
    }); 

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