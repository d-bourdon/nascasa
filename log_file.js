var fs = require("fs");
var async = require("async");
var path = require("path");
var mongoose = require('mongoose');
var error_log = require("./error")
var dateFormat = require('dateformat');
var now = new Date();
var shem = require('./model_mongo')

var Lfile = mongoose.model("Lfile", shem.Shemfiles);
var Limg = mongoose.model("Limg", shem.Shemimg);


/*
** Fonction de base, non utilisé
*/
function log_file(chemin)
{
	console.log("chemin = "+ chemin);
	fs.readdir(chemin,
		function(err, files)
		{
			if (err)
				error_log.error_log("Warning", "log_file : readdir>1" + err);
			else
			{
				async.each(files, function(elem, callback)
				{
					fs.stat(path.join(chemin, elem), function(err, stat)
					{
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
		function(err)
		{
			if (err)
				error_log.error_log("Warning", "log_file : readdir>" + err);
		});
}


/*
** Fonction de log SANS vérification
*/
function log_img(chemin)
{
	fs.readdir(chemin,
		function(err, files)
		{
			if (err)
				error_log.error_log("Warning", "log_img : readdir>1" + err);
			else
			{
				async.each(files, function(elem, callback)
				{
					fs.stat(path.join(chemin, elem), function(err, stat)
					{
						if (err)
							error_log.error_log("Error", "log_img : readdir>stat>" + err);
						else
						{
							if (stat.isFile())
							{
								ext = path.extname(elem)
								if (ext == ".jpg" || ext == ".png" || ext == ".gif")
								{
									f = new Limg({nom : elem, path : path.relative(__dirname + "/public/", path.join(chemin, elem)), patha: path.join(chemin, elem), type : ext, date_m : dateFormat(stat.mtime, "dd-mm-yyyy HH:MM:ss"), date_c : dateFormat(stat.ctime, "dd-mm-yyyy HH:MM:ss"), date_a : dateFormat(now, "dd-mm-yyyy HH:MM:ss")});
									f.save();
								}
							}
							else if (stat.isDirectory())
								log_img(path.join(chemin, elem));
						}
					});
					callback(false);
				});
			}
		},
		function(err)
		{
			if (err)
				error_log.error_log("Warning", "log_img : readdir>" + err);
		});
}

/*
** Fonction de log AVEC vérification
*/
function log_img_verif(chemin)
{
	fs.readdir(chemin,
		function(err, files)
		{
			if (err)
				error_log.error_log("Warning", "log_img_verif : readdir>1" + err);
			else
			{
				async.each(files, function(elem, callback)
				{
					fs.stat(path.join(chemin, elem), function(err, stat)
					{
						if (err)
							error_log.error_log("Error", "log_img_verif : readdir>stat>" + err);
						else
						{
							if (stat.isFile())
							{

								ext = path.extname(elem)
								Limg.findOne({patha: path.join(chemin, elem)}, function(err,obj)
								{
									if (err)
										error_log.error_log("Error", "log_img_verif : readdir>stat>findOne>" + err);
									if (!obj && (ext == ".jpg" || ext == ".png" || ext == ".gif"))
									{
										f = new Limg({nom : elem, path : path.relative(__dirname + "/public/", path.join(chemin, elem)), patha: path.join(chemin, elem), type : ext, date_m : dateFormat(stat.mtime, "dd-mm-yyyy HH:MM:ss"), date_c : dateFormat(stat.ctime, "dd-mm-yyyy HH:MM:ss"), date_a : dateFormat(now, "dd-mm-yyyy HH:MM:ss")});
										f.save();
									}
								});
							}
							else if (stat.isDirectory())
								log_img(path.join(chemin, elem));
						}
					});
					callback(false);
				});
			}
		},
		function(err)
		{
			if (err)
				error_log.error_log("Warning", "log_img : readdir>" + err);
		});
}

exports.log_file = log_file;
exports.log_img = log_img;
exports.log_img_verif = log_img_verif;