var fs = require("fs");
var dateFormat = require('dateformat');
var now = new Date();

function error_log(head, message){
	log = dateFormat(now, "[dd-mm-yyyy][HH-MM-ss] ");
	log += head + " =>>" + message + "\n";
	fs.appendFile("./log", log, function(err){
		if (err || head === "Danger")
			process.exit(1);
	});
	if (head === "Danger")
		console.error(log);
};

exports.error_log = error_log;
