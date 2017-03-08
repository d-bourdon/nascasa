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
	bat = spawn('mongod', ['--dbpath', config.dbpath,]);
	bat.stdout.on('data', (data) => {
		if (DEBUG == 1)
			error_log.error_log("Warning", `DEGUG : mongo_start> ${data}`);
	});
	bat.stderr.on('data', (data) => {
		error_log.error_log("Warning", `DEGUG : mongo_start> ${data}`);
	});
	bat.on('close', (code) => {
		if (code == 0)
			error_log.error_log("INFO", `DEGUG : mongo_start>UP ${code}`);
		else
			error_log.error_log("Danger", `DEGUG : mongo_start> ${code}`);
	});
	console.log("Serveur de retour ! ");
	callback();
}

exports.mongo_start = mongo_start;