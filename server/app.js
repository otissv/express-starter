// sever/app.js

// Express application

'use strict';

// =============================================================================
// Configuration
// =============================================================================

var express = require('express');
var app = express();
var configLocals = require('../config/locals.js')(app);
var db = require('../database/connection.js')(app.locals.db.uri, app.locals.db.opts);


// =============================================================================
// Middleware
// =============================================================================
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
var secret = require('../config/secret.js');
var methodOverride = require('method-override');
var store = require('mongoose-session')(mongoose);
var csrf = require('csurf');
var helmet = require('helmet');

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

// Session
app.use(session({
  secret: secret.session,
  store: store,
  saveUninitialized: true,
  resave: true
}));

// Initialise authentication
app.use(passport.initialize());

// persistent login sessions
app.use(passport.session());

// Flash messages
app.use(flash({ locals: 'flash' }));


// =============================================================================
// Security
// =============================================================================

// Disable x-powered-by
app.disable('x-powered-by');

// Cross-site request forgery
app.use(csrf());
app.use(function(req, res, next) {
  res.locals._csrfToken = req.csrfToken();
  next();
});


// Content Security Policy
app.use(helmet.csp({
  defaultSrc: ["'self'"],
  scriptSrc: ['*.google-analytics.com'],
  styleSrc: ["'unsafe-inline'"],
  imgSrc: ['*.google-analytics.com'],
  connectSrc: ["'none'"],
  fontSrc: [],
  objectSrc: [],
  mediaSrc: [],
  frameSrc: []
}));

// X-XSS-Protection
app.use(helmet.xssFilter());

// X-Frame: Deny
app.use(helmet.xframe());

// Strict-Transport-Security
app.use(helmet.hsts({
  maxAge: 7776000000,
  includeSubdomains: true
}));

// Sniff mimetypes
app.use(helmet.noSniff());

// IE, restrict untrusted HTML
app.use(helmet.ieNoOpen());

// enforce https
// app.use(require('express-enforces-ssl'));


// =============================================================================
// Routes
// =============================================================================

// Order is important!
var user = require('./users/users.routes.js')(app, passport);
var core = require('./core/core.routes.js')(app, passport);


// =============================================================================
// Expose app
// =============================================================================

module.exports = app;
