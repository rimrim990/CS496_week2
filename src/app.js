var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const session = require("express-session");
//const { mongoose } = require("./lib/database");
require('dotenv').config();

// const SESSION_SECRETE = process.env.SESSION_SECRETE;
// const SECRET = process.env.SECRET;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const runningRouter = require('./routes/running')
const groupRouter = require('./routes/group');
const authRouter = require('./routes/auth');
const recordRouter = require('./routes/record');
const { Record } = require('./lib/database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.set('jwt-secret', SECRET);
/*
app.use(
  session({
    secret: SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
    store: require("mongoose-session")(mongoose), // session 저장 장소 (Mongodb)
    cookie: {maxAge: (3.6e+6)*24} // 24시간 뒤 만료 (자동 삭제)
  })
);
*/

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/running', runningRouter);
app.use('/users', usersRouter);
app.use('/group', groupRouter);
app.use('/record', recordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
