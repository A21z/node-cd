var express = require('express')
var path = require('path')
var http = require('http')
var routes = require('./routes.js')
var config = require('../config.js')
var app = express()
var morgan = require('morgan')
var bodyParser = require('body-parser')

app.set('port', process.env.WWW_PORT || config.server.port)
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname + 'public')))

app.get('/', routes.index.index)
app.get('/favicon.ico', routes.index.favicon)
app.post('/github', routes.index.github)
app.post('/bitbucket', routes.index.bitbucket)
app.post('/contentful', routes.index.contentful)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Node-cd server listening on port ' + app.get('port'))
})
