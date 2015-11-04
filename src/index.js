var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var routes = require('./routes.js');
var config = require('../config.js');
var app = express();

app.configure(function(){
  app.set('port', process.env.WWW_PORT || config.server.port);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(path.join(__dirname + 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//app.get('/routes', routes.__allRoutes);
app.get('/', routes.index.index);
app.get('/favicon.ico', routes.index.favicon);
app.post('/github', routes.index.github);
app.post('/bitbucket', routes.index.bitbucket);
app.post('/contentful', routes.index.contentful);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Node-cd server listening on port " + app.get('port'));
});
