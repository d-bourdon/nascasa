/*
** DEBUG :
** Gestion d'érreur permetant de ratraper des erreurs sommaires :
** - mongod non lancé / crashé
*/

var error_log = require("./error");
var config = require("./config").config;
var spawn = require('child_process').spawn;

function  mongo_start() {
	bat = spawn('mongod', ['--dbpath', config.dbpath,]);
	bat.stdout.on('data', (data) => {
		error_log.error_log("Warning", `DEGUG : mongo_start> ${data}`);
	});
	bat.stderr.on('data', (data) => {
		error_log.error_log("Warning", `DEGUG : mongo_start> ${data}`);
	});
	bat.on('close', (code) => {
		if (code == 0)
		{
			error_log.error_log("INFO", `DEGUG : mongo_start>UP ${code}`);
			console.log("Serveur on");
		}
		else
			error_log.error_log("Danger", `DEGUG : mongo_start> ${code}`);
		//Do stuff before close app server-client
	});
}

exports.mongo_start = mongo_start;