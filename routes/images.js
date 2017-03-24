//var express = require('express');
//var router = express.Router();
var mongoose = require('mongoose');
var shem = require('../model_mongo');
var Limg = mongoose.model("Limg", shem.Schemimg);

/* GET users listing. */
// router.get('/', function(req, res, next) {
// 	Limg.find(function (err, clients)
// 		{
// 			res.render('pages/client', { clients: clients })
// 		});
// });
var imagev = [];
var clients = [];
var query = [];
var test = []

exports.index = function(req, res)
{
	Limg.find(function (err, images)
	{
		var empty = 0;
		if (images.length == 0)
			empty = 1;
		console.log(images.length);
		res.render('pages/client', { clients: images, query: req.query, empty : empty });
	});
};

exports.new = function(req, res)
{
	res.render('pages/img_import');
};

exports.create = function(req, res)
{
	res.redirect('pages/client');
};

exports.show = function(req, res)
{
	var id = req.params.image;
	console.dir(req.params);
	Limg.findById(id, function(err, image)
		{
			if (err)
	    		console.log("error");
	    	else if (image === null)
	        	res.redirect('/image');
			res.render('pages/image_show', {imagev : image});
		});
};

exports.update = function(req, res)
{
	var id = req.params.image;
	Limg.findByIdAndUpdate(id, {}, function(err, image)
	{
		res.redirect(200, 'pages/client');
	});
};

exports.destroy = function(req, res)
{
	var id = req.params.image;
	Limg.findByIdAndRemove(id, function(err, image)
	{
		console.log("bye");
		res.redirect('/image?error=success&msgError=Image suprimée !');
	});
};