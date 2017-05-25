var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
** Stucture Simple
*/
exports.Shemfiles = Schema({
	nom : String,
	path : String,
	dir : String
});

/*
** Structure pour images
*/
exports.Schemimg = Schema({
	nom : String,
	path : String,
	patha : String,
	type : String,
	date_m : String,
	date_c : String,
	date_a : String,
	base_f : String
});

exports.Shemcateg_img = Schema({
 	nom : String,
 	date: { type: Date, default: Date.now },
 	image : [{ type: Schema.Types.ObjectId, ref: 'Image' }]
 });

exports.Shemcateg = Schema({
	nom : String,
	date: { type: Date, default: Date.now }
});

/*
** Structure pour config
*/
exports.Schemconfig = Schema({
	cle : String,
	valeur : String
});
