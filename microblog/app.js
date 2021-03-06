var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials=require('express-partials');
var index = require('./routes/index');
var users = require('./routes/users');
var reg=require('./routes/reg');
var login=require('./routes/login');
var app = express();
 app.use(partials());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//连接数据库
// var mongo=require('./models/db');
//数据库session
var settings=require('./models/settings');
debugger;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: 'foo',
    store: new MongoStore({
      url:'mongodb://localhost/test'
      // mongoOptions: advancedOptions // See below for details
    })
}));
app.use(flash());
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);
//
// app.use(session({
//     secret: settings.cookieSecret,
//     store: new MongoStore({
//       db: settings.db
//     })
  //}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/reg',reg);
app.use('./login',login);
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
