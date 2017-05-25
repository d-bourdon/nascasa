var mongoose = require('mongoose');

/*
** Stucture Simple
*/
exports.Shemfiles = mongoose.Schema({
	nom : String,
	path : String,
	dir : String
});

/*
** Structure pour images
*/
exports.Schemimg = mongoose.Schema({
	nom : String,
	path : String,
	patha : String,
	type : String,
	date_m : String,
	date_c : String,
	date_a : String,
	base_f : String
});

// exports.Shemcateg_img = mongoose.Schema({
//  	nom : String,
//  	date: { type: Date, default: Date.now },
//  	image : [Schemimg]
//  });

exports.Shemcateg = mongoose.Schema({
	nom : String,
	date: { type: Date, default: Date.now }
});

/*
** Structure pour config
*/
exports.Schemconfig = mongoose.Schema({
	cle : String,
	valeur : String
});
