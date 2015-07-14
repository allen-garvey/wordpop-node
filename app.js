var express = require('express');
var app = express();

app.use(express.static('public_html'));

app.get('/', function (req, res) {
	var options = {
    	root: __dirname,
    	dotfiles: 'deny',
    	headers: {
        	'x-timestamp': Date.now(),
        	'x-sent': true
    	}
  	};
  res.sendFile('views/index.html', options);
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.status(404).send('404 not found');
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});