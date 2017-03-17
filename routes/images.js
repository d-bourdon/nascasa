var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var shem = require('../model_mongo');


var Limg = mongoose.model("Limg", shem.Schemimg);

/* GET users listing. */
router.get('/', function(req, res, next) {
	Limg.find(function (err, clients)
		{
			res.render('pages/client', { clients: clients })
		});
});


exports.index = function(req, res)
{
	Limg.find(function (err, images)
	{
		res.render('pages/index', { images: images });
	};
};

exports.new = function(req, res)
{
	res.render('pages/img_import');
};

exports.create = function(req, res)
{
	res.redirect('pages/index');
};

exports.show = function(req, res)
{
	var id = req.params.image;
	Limg.findById(id, function(err, image)
		{
			res.render('pages/image_show', {image : image});
		});
};

exports.update = function(req, res)
{
	var id = req.params.image;
	Limg.findByIdAndUpdate(id, {}, function(err, image)
	{
		res.redirect('pages/index');
	});
};

exports.destroy = function(req, res)
{
	var id = req.params.image;
	Limg.findByIdAndRemove(id, function(err, image)
	{
		res.redirect('pages/index');
	});
};