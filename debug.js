/*
** DEBUG :
** Gestion d'érreur permetant de ratraper des erreurs sommaires :
** - mongod non lancé / crashé
*/

/*
** Mode Débug pour plus d'info sur les outputs. 0 = OFF | 1 = ON
*/
DEBUG = 0;

var error_log = require("./error");
var config = require("./config").config;
var spawn = require('child_process').spawn;
var log_file = require('./log_file');
var async = require("async");

function  mongo_start(callback) {
	console.log("mongo autostart removed - sorry")
}

exports.mongo_start = mongo_start;