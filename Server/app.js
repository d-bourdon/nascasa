var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var async = require("async");
var error_log = require("./error")
var log_file = require("./log_file")
var debug = require("./debug");
var	io = require('socket.io');
var config = require("./config").config;

var db = mongoose.connect("mongodb://localhost/mydb");
mongoose.connection.on("error", function() {
	console.log("Erreur de connection - Base de donnée en cours de redémarage ... ");
  debug.mongo_start();
});
mongoose.connection.on("open", function() {
	console.log("Ouverture de connection");
});
io.listen(config.port);
io.sockets.on(‘connection’, function (socket) {
	socket.on('search', function (message) {
	    socket.emit('r_search', find_photo(message));
    });
});

function find_photo(arg) {
	
}

console.log("OK");