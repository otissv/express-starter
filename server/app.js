// Express config
'use strict';

// =============================================================================
// Dependencies.
// =============================================================================

var express = require('express');
var db = require('../database/connection.js');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var compress = require('compression');
var mogan = require('morgan');
var flash = require('connect-flash');

// Initialize express app
var app = express();

// =============================================================================
// Configuration
// =============================================================================

// Bootstrap passport config
require('./config/passport')(passport);

// Location of view folders
app.set('views', path.join(__dirname, './modules/core/views'));

// View engine setup
app.set('view engine', 'jade');

// Uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// Application logger
app.use(logger('dev'));

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Should be placed before express.static
app.use(compress({
  filter: function(req, res) {
    return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
  },
  level: 9
}));

// Static files locations
app.use(express.static(path.join(__dirname, '../public')));


// Read cookies (needed for auth)
app.use(cookieParser());

// Session secret
app.use(session({ secret: 'SECRET' }));

// Initialise authentication
app.use(passport.initialize());

// persistent login sessions
app.use(passport.session());

// Flash messages stored in session
app.use(flash());


// =============================================================================
// Routes
// =============================================================================

// Order is important!
var user = require('./modules/users/users.routes.js')(app, passport);
var core = require('./modules/core/core.routes.js')(app, passport);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
// =============================================================================
// Expose app
// =============================================================================

module.exports = app;
