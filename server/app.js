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
var flash = require('req-flash');
var swig = require('swig');
var credentials = require('../.credentials.js');
var methodOverride = require('method-override');

// =============================================================================
// Configuration
// =============================================================================

// Initialize express app
var app = express();

// Bootstrap passport config
require('./users/user.auth.js')(passport);

// View engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// Location of view folders
app.set('views', path.join(__dirname, './core/views'));

// Uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// Application logger
switch (app.get('env')) {
  case 'development':
    app.use(require('morgan')('dev'));
    break;
  case 'production':
    app.use(require('experss-logger')({
      path: __dirname + '/log/requests.log'
    }));
    break;
}

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// Over ride request header
app.use(methodOverride());
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
app.use(session({
  secret: credentials.sessionSecret,
  saveUninitialized: true,
  resave: true
}));

// Initialise authentication
app.use(passport.initialize());

// persistent login sessions
app.use(passport.session());

// Flash messages stored in session
app.use(flash({ locals: 'flash' }));

// Disable x-powered-by
app.disable('x-powered-by');

// =============================================================================
// Routes
// =============================================================================

// Order is important!
var user = require('./users/users.routes.js')(app, passport);
var core = require('./core/core.routes.js')(app, passport);

// 404 catch-all handler
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

// 505 catch-all handler
app.use(function(req, res, next) {
  console.error(err.stack);
  res.status(505);
  res.render('505');
});

// =============================================================================
// Expose app
// =============================================================================

module.exports = app;
