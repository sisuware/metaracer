/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var https = require('https');
var fs = require('fs');
var helmet = require('helmet');
var express = require('express');
var subdomain = require('express-subdomain');
var mongoose = require('mongoose');
var config = require('./config/environment');

console.log(process.env);

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
});

var httpsConfig = {
  key: fs.readFileSync(config.https.keyFile),
  cert: fs.readFileSync(config.https.certFile),
  ciphers: config.https.ciphers
};

// Setup server
var app = express();
var router = express.Router();
var server = https.createServer(httpsConfig, app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);
require('./config/sqs')();

app.use(helmet.hsts(config.helmet));

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
