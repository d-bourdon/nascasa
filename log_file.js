var fs = require("fs");
var async = require("async");
var path = require("path");
var mongoose = require('mongoose');

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
				console.log("Une erreur est survenue :" + err);
			else
			{
				async.each(files, function(elem, callback){
					fs.stat(path.join(chemin, elem), function(err, stat){
						var f = new Lfile({nom : elem, path : path.join(chemin, elem), type : stat.isDirectory()});
						f.save;
					});
					callback(false);
				});
			}
		},
		function(err){
			if (err)
				console.log("ereur :" + err)
			Lfile.find(function (err, clients) {
				console.log(clients);
			});
		});
}

exports.log_file = log_file;