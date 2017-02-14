var fs = require("fs");
var async = require("async");
var path = require("path");
var mongoose = require('mongoose');
var error_log = require("./error")

var db = mongoose.connect("mongodb://localhost/mydb");
var Shemfiles = mongoose.Schema({
	nom : String,
	path : String,
	dir : String 
});

var Lfile = mongoose.model("Lfile", Shemfiles);

function log_file(chemin){
	fs.readdir(chemin,
		function(err, files){
			if (err)
				error_log.error_log("Warning", "log_file : readdir>1" + err);
			else
			{
				async.each(files, function(elem, callback){
					fs.stat(path.join(chemin, elem), function(err, stat){
						if (err)
							error_log.error_log("Error", "log_file : readdir>stat>" + err);
						else
						{
							var f = new Lfile({nom : elem, path : path.join(chemin, elem), type : stat.isDirectory()});
							f.save();
						}
					});
					callback(false);
				});
			}
		},
		function(err){
			if (err)
				error_log.error_log("Warning", "log_file : readdir>" + err);
		});
}

log_file("dsahduisadnjsandjnsajdiasdas");

exports.log_file = log_file;