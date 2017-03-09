var mongoose = require('mongoose');

/*
** Stucture Simple
*/
var Shemfiles = mongoose.Schema({
	nom : String,
	path : String,
	dir : String
});

/*
** Structure pour images
*/
var Shemimg = mongoose.Schema({
	nom : String,
	path : String,
	patha : String,
	type : String,
	date_m : String,
	date_c : String,
	date_a : String
});

exports.Shemfiles = Shemfiles;
exports.Shemimg = Shemimg;