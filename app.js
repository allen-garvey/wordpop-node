var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var $ = require('cheerio');
var request = require('request');
var CLModel = require('./models/cl_model');

//set handlebars file extension to .hbs and set default layout to main
var handlebars = require('express-handlebars').create({defaultLayout:'main', extname: '.hbs'});
//setup app views
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

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
    // res.sendFile('views/homepage.html', responseOptions);
    res.render('homepage', {pageName:'home'});
});
app.get('/cities-comparison', function (req, res) {
    // res.sendFile('views/cities_comparison.html', responseOptions);
    res.render('cities_comparison', {pageName:'cities_comparison'});
});

app.get('/data/cl.json', function (req, res) {
    res.send(CLModel.model);
});

app.post('/data.json', function (req, res) {
    var reqUrl = CLModel.urlFromRequest(req.body);
    
    if(!reqUrl.match(/^http:/)){
        res.status(400).send('400 Bad request');
        return;
    }

    var reqUrlBase = CLModel.cityUrlFromCity(req.body.city);

    request(reqUrl, function(error, response, html){
        if (error){
            console.error(err);
            res.status(500).send('Could not connect to ' + reqUrl);
            return;
        }
        var parsedHTML = $.load(html);
        
        var searchResultsCount = parseInt(parsedHTML('.totalcount').first().text());
        searchResultsCount = isNaN(searchResultsCount) ? 0 : searchResultsCount;
        var posts = [];
        var postLinks = parsedHTML('a.hdrlnk');
        var linksToParse = postLinks.length;
        postLinks.map(function(i, element) {
            var resultsLink = $(element);
            var title = resultsLink.text();
            var postLink = resultsLink.attr('href');
            //test required because if few results craigslist will give links to nearby cities
            var isLocal = !postLink.match(/^http:/);
            var postLink = !isLocal ? postLink : reqUrlBase + postLink;

            request(postLink, function(error, response, html){
                var postBody = parsePostBody(error, response, html);
                if(!postBody.error){
                    posts.push({title : title, url: postLink, isLocal: isLocal, body: postBody.body, time: postBody.time});
                }
                else{
                    posts.push({title : title, url: postLink, isLocal: isLocal});
                }
                linksToParse--;
                if(linksToParse <= 0){
                    res.json({searchResultsCount: searchResultsCount, posts: posts});
                } 
            });
        });
        
    });
});

function parsePostBody(error, response, html){
    if (error){
        return {error: error};
    }
    var parsedHTML = $.load(html);
    var postBody = parsedHTML('#postingbody').text();
    var postTime = parsedHTML('.postinginfo time').attr('datetime');
    return {body: postBody, time: postTime};
}


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.status(404).send('404 not found');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Wordpop-node app listening at http://%s:%s', host, port);
});