var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var async = require("async");

var index = require('./routes/index');
var users = require('./routes/users');

var db = mongoose.connect("mongodb://localhost/mydb");
mongoose.connection.on("error", function() {
	console.log("Erreur de connection");
});
mongoose.connection.on("open", function() {
	console.log("Ouverture de connection");
});

var app = express();

var files = mongoose.Schema({
	nom : String,
	path : String,
	type : String 
});
var Lfile = mongoose.model("Lfile", files);
var dchemin = "/Users/dbourdon/"

function log_file(chemin){
  fs.readdir(chemin ,
    function(err, files){
      if (err)
        console.log("Une erreur est survenue :" + err);
      else
      {
        async.each(files, function(elem, callback){
          fs.stat(path.join(chemin, elem), function(err, stat){
            var f = new Lfile({nom : elem, path : path.join(chemin, elem), type : stat.isDirectory()});
            f.save();
            console.log("add");
            if (stat.isDirectory())
              log_file(path.join(chemin, elem));
          });
          callback(false);
        });
      }
    },
    function(err){
      if (err)
        console.log("ereur :" + err)
    });
}
// var f = new Lfile({nom : "Test", path : "test/test", type : "test"});
// f.save(function(){
 	Lfile.find(function (err, clients) {
 		console.log(clients);
 	});
// });

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

log_file(dchemin);

module.exports = app;
