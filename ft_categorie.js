var fs = require("fs");
var async = require("async");
var path = require("path");
var mongoose = require('mongoose');
var error_log = require("./error")
var dateFormat = require('dateformat');
var now = new Date();
var shem = require('./model_mongo')

var Lfile = mongoose.model("Lfile", shem.Shemfiles);
var Limg = mongoose.model("Limg", shem.Schemimg);
var Lcat = mongoose.model("Lcat", shem.Shemcateg);
var Lcat_img = mongoose.model("Lcat_img", shem.Shemcateg_img);

exports.index = function()
{
	var cat_ret = [];
	Lcat.find(function (err, cat)
	{
		if (!err)
			cat_ret.push(cat);
	});
	return cat_ret;
};


/*
** Si la categorie existe, retourne 1, si non retourne 0.
*/
exports.cat_exist = function(input)
{
	if (input)
	{
		Lcat.findOne({'nom' : input}, function(err, cat)
		{
			if (err)
				return 0;
			if (cat)
				return 1;
			return 0;
		});
	}
};

/*
** Ajoute la categorie, retourne 1 si il y a une erreur sinon 0
*/
exports.cat_add = function(input)
{
	if (!input) return 1;
	var add = new Lcat({'nom' = input});
	Lcat.save(input, function(err)
	{
		if (!err)
		{
			error_log("Warning", "cat_add > Erreur d'ajout de catégorie.");
			return 1;
		}
	});
	return 0;
};

/*
** Supprime la categorie, retourne 1 si il y une erreur, sinon 0
*/
exports.cat_del = function(input)
{
	if (!input) return 1;
	Lcat.findOneAndRemove({'nom' : input}, function(err, cat)
	{
		if (err) return 1;
		return 0;
	});
};