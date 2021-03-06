var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var admin = require('./routes/admin');
var kerkesa = require('./routes/kerkesa');
var problemi = require('./routes/problemi');
var report = require('./routes/report');
var noAuth = require('./routes/noAuth');

var passport = require('passport');
var session = require('express-session');
var COOKIE_SECRET = 'Nexus5x';
var EXPRESS_SID_KEY = 'connect.sid';

var app = express();

// Connection Mongoose
mongoose.connect('mongodb://localhost/projekti-shkolles');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    name:EXPRESS_SID_KEY,
    cookie:{maxAge: 12 * 60 * 60 * 6000}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/admin', admin);
app.use('/kerkesa', kerkesa);
app.use('/problemi', problemi);
app.use('/report', report);
app.use('/no-auth', noAuth);

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
