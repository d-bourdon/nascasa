var express = require('express');
var router = express.Router();
var log_file = require('../log_file');

/* GET home page. */
router.get('/', function(req, res, next) {
	log_file.log_img('/Users/dbourdon/nascasa/');
	console.log("test")
  res.render('index', { title: 'Express' });
});

module.exports = router;