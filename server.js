require('app-module-path').addPath(__dirname);
var express = require('express');
var http = require('http');

var app = express();

app.use(express.static('./'));

var server = http.createServer(app);
server.listen(9091);
console.log("Listening to 9091");
