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
var image = [];
var clients = [];
var query = [];

exports.index = function(req, res)
{
	Limg.find(function (err, images)
	{
		res.render('pages/client', { clients: images, query: req.query });
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
	var id = req.params.imagesd;
	console.dir(req.params);
	Limg.findById(id, function(err, image)
		{
			if (err)
				res.redirect('/imagesd');
			res.render('pages/image_show', {imagev : image});
		});
};

exports.update = function(req, res)
{
	var id = req.params.imagesd;
	Limg.findByIdAndUpdate(id, {}, function(err, image)
	{
		res.redirect(200, 'pages/client');
	});
};

exports.destroy = function(req, res)
{
	var id = req.params.imagesd;
	Limg.findByIdAndRemove(id, function(err, image)
	{
		console.log("bye");
		res.redirect('/imagesd?error=success&msgError=Image suprimée !');
	});
};