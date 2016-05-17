var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

var bodyParser = require('body-parser');
var request = require('request');

var JSONbig = require('json-bigint')
//app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'application/json' }))

var token = "EAAYCWfiuiugBAEN7s2hWgUk5DbyeZCv56eu1R3CandniCwyuMk6jiVPMxx1ZAecaw0Qjwje5eCc0s0nZCLSXlWoJHxZCMag4pd4du2kEjrvGNhU8ab9hwncPufy5amzlIho9gDJtTnXGvwwZAAHorG3RzFRAhf7sWlklzerU2VQZDZD"

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'verify') {
    console.log("verified")
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

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

  var data = JSONbig.parse(req.body);
  console.log(data)
  messaging_events = data.entry[0].messaging;
  sender = messaging_events[0].sender.id.toString();
  console.log(sender)

  sendTextMessage(sender, 'hello world!');


  // for (i = 0; i < messaging_events.length; i++) {
  //   event = data.entry[0].messaging[i];
  //   sender = event.sender.id.toString();
  //   console.log(sender);
  //   console.log(typeof(sender));
  //   if (event.message && event.message.text) {
  //     text = event.message.text;
  //     // Handle a text message from this sender
  //     sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
  //     console.log(text);



  //   }
  // }
  console.log("Post")
  res.sendStatus(200);
});



var port = process.env.PORT || 3000;

var listener = server.listen(port, function() {
  var host = server.address().address;
  console.log('Columbia Bot listening at http://%s:%s', host, port);
});
