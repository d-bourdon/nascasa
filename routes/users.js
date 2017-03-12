var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var shem = require('../model_mongo');


var Limg = mongoose.model("Limg", shem.Shemimg);

/* GET users listing. */
router.get('/', function(req, res, next) {
	Limg.find(function (err, clients)
		{
			res.render('pages/client', { clients: clients })
		});
});

module.exports = router;
