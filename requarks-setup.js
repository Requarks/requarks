// ===========================================
// REQUARKS - SETUP
// 1.0.0
// Licensed under GPLv3
// ===========================================


var fs = require('fs');
var appconfig = {};
try {
    fs.accessSync('./config.json', fs.F_OK | fs.R_OK);
    appconfig = require('./config.json');
} catch (e) {
    // Using empty config
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var compression = require('compression');
var _ = require('lodash');

var ctrlSetup = require('./controllers/setup');

app = express();
ROOTPATH = __dirname;

var _isDebug = (app.get('env') === 'development');

// ----------------------------------------
// View Engine Setup
// ----------------------------------------

app.use(compression());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));

// ----------------------------------------
// Assets
// ----------------------------------------

app.use(sass({
  src: path.join(__dirname, 'client'),
  dest: path.join(__dirname, 'assets'),
  outputStyle: 'compressed',
  debug: _isDebug
}));
app.use(express.static(path.join(__dirname, 'assets')));

// ----------------------------------------
// Disable IE compatibility mode
// ----------------------------------------

app.use(function(req, res, next) {
  res.setHeader('X-UA-Compatible','IE=edge');
  return next();
});

// ----------------------------------------
// Expose Application Configs
// ----------------------------------------

app.locals.appdata = require('./data.json');
app.locals.appconfig = _.defaultsDeep(appconfig, app.locals.appdata.configstructure);

// ----------------------------------------
// Controllers
// ----------------------------------------

app.use('/', ctrlSetup);

// ----------------------------------------
// Error handling
// ----------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: _isDebug ? err : {}
  });
});

// ----------------------------------------

module.exports = app;
