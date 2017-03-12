var express = require('express');
var router = express.Router();
var log_file = require('../log_file');
var config = require('../config').config
var async = require("async");


/* GET home page. */
router.get('/', function(req, res, next) {
	async.each(config['search_path'], function(s_path, callback)
	{
		log_file.log_img_verif(s_path);
		callback(false);
	});
  res.render('pages/search', { path: config['search_path'] });
});

module.exports = router;