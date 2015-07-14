var express = require('express');
var app = express();
var http = require('http');

app.use(express.static('public_html'));

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

app.get('/search/cl/web/?', function (req, res) {
  http.get("http://newyork.craigslist.org/search/web", function(searchResponse) {
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