var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var async = require("async");
var ressource = require('express-resource');
var methodOverride = require('method-override');

/*
** Script maison
*/
var error_log = require("./error")
var log_file = require("./log_file")
var debug = require("./debug");
var config = require("./config").config;
var shem = require('./model_mongo');

/*
** Include des routes
*/
var index = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');

var app = express();

/*
** Connection base de donnée mongo avec debug
*/
var db = mongoose.connect(config['link_db']);
mongoose.connection.on("error", function() {
	console.log("Erreur de connection, Merci de relancer le serveur");
	process.exit(1);
});
mongoose.connection.on("open", function() {
	console.log("Ouverture de connection");
});

// view engine setup
app.use(bodyParser());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.resource("image", require("./routes/images.js"));
/*
** Définition des routes
*/
var Limg = mongoose.model("Limg", shem.Schemimg);
// app.use("/image/:id?", function(req, res)
// {
//         console.log(req.params.id);
//     Limg.findById(req.params.id, function(err, image)
//     {
//       if (err)
//         console.log("error");
//       else if (image === null)
//       {
//         res.redirect('../pages/users');
//         console.log('No results found');
//       }
//       res.render('pages/image_show', {imagev : image, tittle : "Holla que tal"});
//     });
//   res.render
// })
app.use('/', index);
app.use('/users', users);
app.use('/search', search);

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
