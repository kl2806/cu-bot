var express = require('express');
var app = express();
var http = require('http').Server(app);


app.get('/webhook', function (req, res) {
  res.send('Hello World!');
});

// app.listen(3000, function () {
//       console.log('Example app listening on port 3000!');
// });

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});

