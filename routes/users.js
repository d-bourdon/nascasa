var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var shem = require('../model_mongo');

// var Shemfiles = mongoose.Schema({
// 	nom : String,
// 	path : String,
// 	dir : String
// });
// var Shemimg = mongoose.Schema({
// 	nom : String,
// 	path : String,
// 	type : String,
// 	date_m : String, 
// 	date_c : String, 
// 	date_a : String 
// });

//var Lfile = mongoose.model("Lfile", shem.Shemfiles);
var Limg = mongoose.model("Limg", shem.Shemimg);

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log('OK COOL1');
	Limg.find({}, function (err, clients)
		{
			if (err) throw err;
			console.log(clients);
			console.log('OK COOL');
		});
  res.send('respond with a resource');
});

module.exports = router;
