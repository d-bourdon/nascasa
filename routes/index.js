var express = require('express');
var router = express.Router();
var log_file = require('../log_file');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;