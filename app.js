var express = require('express');
var app = require('express')();
var server = require('http').Server(app);


var config = require('./config.json');
var kb = require('./kb.json');
var fbmsg = require('./fbmsg.js')({server: server, app: app , config :config});


server.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode");
});

app.use('/public', express.static('public'));

// App configuration
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', ('public'))


app.get('/', function(req, res) {
  res.render("index.html");
});
