var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);


app.get('/webhook', function (req, res) {
  console.log("here")
  if (req.query['hub.verify_token'] === 'verify') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

var token = "EAAYCWfiuiugBAEN7s2hWgUk5DbyeZCv56eu1R3CandniCwyuMk6jiVPMxx1ZAecaw0Qjwje5eCc0s0nZCLSXlWoJHxZCMag4pd4du2kEjrvGNhU8ab9hwncPufy5amzlIho9gDJtTnXGvwwZAAHorG3RzFRAhf7sWlklzerU2VQZDZD"

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.post('/webhook/', function (req, res) {
  console.log("hereeeee")
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      console.log(text);
      sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});

var port = process.env.PORT || 3000;

var listener = server.listen(port, function() {
  var host = server.address().address;
  console.log('PCompass app listening at http://%s:%s', host, port);
});
