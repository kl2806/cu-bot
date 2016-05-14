var http = require('http');
var express = require('express') //.createServer(); // 
var app = express();
var server = http.createServer(app);


app.get('/webhook', function (req, res) {
  res.send('Hello World!');
});

app.get('/webhook', function (req, res) {
  res.send('Home');
});

// app.listen(3000, function () {
//       console.log('Example app listening on port 3000!');
// });


var port = process.env.PORT || 3000;
var listener = server.listen(port, function() {
  var host = server.address().address;
  console.log('PCompass app listening at http://%s:%s', host, port);
});
