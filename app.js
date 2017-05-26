var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var fs = require("fs");
var index = require('./routes/index');
var users = require('./routes/users');



var app = express();

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
/*app.use(function(req, res) {
	console.log("In first Function")
	res.locals.message='Not Found/Invalid Data Input'
 var err = new Error('Not Found/Invalid Data Input');
  
  err.status = 404;
  res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};
   res.status(err.status || 404);
  res.render('error');
  //next(err);
});*/

app.use(function(req, res) {
	console.log("In second Function")
	res.locals.message='Not Found/Invalid Data Input'
 var err = new Error('Not Found/Invalid Data Input');
  
  err.status = 400;
  res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};
   res.status(err.status || 400);
  res.render('error');
  //next(err);
});

// error handler
app.use(function(err, req, res, next) {
	console.log("Error Name"+err.name)
	if(err.name=="SequelizeConnectionError")
	{
		console.log("Hello")
		res.locals.message ="Invalid DB Name";
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
		 
	}
	if(err.name=="SequelizeAccessDeniedError")
	{
		console.log("Invalid Password")
		res.locals.message ="Invalid DB Credentials";
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
		 
	}
	if(err.name=="SequelizeDatabaseError")
	{
		console.log("Invalid Column Name")
		res.locals.message ="Invalid DB Column Name";
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
		 
	}
	
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
