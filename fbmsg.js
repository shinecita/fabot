/*!
 * Tiny Facebook Messenger API Consumer for express
 * @shinecita
 * MIT Licensed
 */


 "use strict";

 var bodyParser = require('body-parser');
 var jsonParser = bodyParser.json();
 var bot = require("./kbbot.js")();
 var request = require('request');
 var utf8=require("utf8");



 module.exports = function (opts) {
    var facebookMsg = this,
        config = opts.config,
        server = opts.server,
        app = opts.app,
        io = require('socket.io')(server, {'transports' : [ 'websocket', 'flashsocket', 'polling' ] });


    // conect to app
    app.get('/webhook/', function (req, res) {
      if (req.query['hub.verify_token'] === config.token) {
        res.send(req.query['hub.challenge']);
      }
      res.send('Error, wrong validation token');
    })

   // open channel for message receive;
   app.post('/webhook/',jsonParser, function (req, res) {
     if (req.body) {
      var  messaging_events = req.body.entry[0].messaging;
         for (var i = 0; i < messaging_events.length; i++) {
           var event = req.body.entry[0].messaging[i];
           var sender = event.sender.id;
           if (event.message && event.message.text) {
             var text = event.message.text;

             io.sockets.emit('messages', { message: event.message, sender : sender });
             bot.findAnswer({text: text}, function(answer){
               sendAnswer(sender,  answer[0]);
             })
           }
         }
     }
       res.sendStatus(200);
   });


   function sendAnswer(sender, answer) {

     var messageData = {
       text:answer
     }

     request({
       url: 'https://graph.facebook.com/v2.6/me/messages',
       qs: {access_token:config.token},
       method: 'POST',
       json: {
         recipient: {id:sender},
         message: messageData,
       }
     }, function(error, response, body) {
       if (error) {
         console.log('Error sending message: MSG ', error);
       } else if (response.body.error) {
         console.log('Error: BODY', response.body.error);
       }
     });
   }


   // IO debug
   var status = "ok";

   io.sockets.on('connection', function (socket) {
     io.sockets.emit('status', { status: status }); // note the use of io.sockets to emit but socket.on to listen
     socket.on('reset', function (data) {
       status = "connection reset";
       io.sockets.emit('status', { status: status });
     });
   });

    return facebookMsg;
 };
