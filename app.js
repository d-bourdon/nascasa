var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var async = require("async");

/*
** Script maison
*/
var error_log = require("./error")
var log_file = require("./log_file")
var debug = require("./debug");
var config = require("./config").config;

/*
** Include des routes
*/
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

/*
** Connection base de donnée mongo avec debug
*/
var db = mongoose.connect(config['link_db']);
mongoose.connection.on("error", function() {
	console.log("Erreur de connection, Merci de relancer le serveur");
	process.exit(0);
});
mongoose.connection.on("open", function() {
	console.log("Ouverture de connection");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( express.static( "public/images/" ) );

/*
** Définition des routes
*/
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
