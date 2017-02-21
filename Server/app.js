var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var async = require("async");
var error_log = require("./error")
var log_file = require("./log_file")
var debug = require("./debug");

var db = mongoose.connect("mongodb://localhost/mydb");
mongoose.connection.on("error", function() {
	console.log("Erreur de connection - Base de donnée en cours de redémarage ... ");
  debug.mongo_start();
});
mongoose.connection.on("open", function() {
	console.log("Ouverture de connection");
});

console.log("OK");