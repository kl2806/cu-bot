var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);


app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'verify') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.get('/webhook', function (req, res) {
  res.send('Home');
});

var port = process.env.PORT || 3000;

var listener = server.listen(port, function() {
  var host = server.address().address;
  console.log('PCompass app listening at http://%s:%s', host, port);
});
