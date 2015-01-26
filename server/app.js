// sever/app.js

// Express application

'use strict';

// =============================================================================
// Dependencies
// =============================================================================

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var favicon = require('serve-favicon');
var path = require('path');

// =============================================================================
// Configuration
// =============================================================================

var app = express();

// Applicaion local variables
var locals = require('../config/locals.js')(app);

// Database connection
var db = require('../database/connection.js')(app.locals.db.uri, app.locals.db.opts);

// Authentication
var auth = require('./users/user.auth.js')(passport);

// Application logger
var logger = require('../config/logger.js');

// Uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// Veiw templating
var views = require('../config/views.js')(app, path)
var compress = require('compression');
// Should be placed before express.static
app.use(compress({
  filter: function(req, res) {
    return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
  },
  level: 9
}));

// Static files locations
app.use(express.static(path.join(__dirname, '../public')));

// Body parser
var body = require('../config/body.js');

// Session
var session = require('../config/session.js')(app, passport)

// Security
var security = require('../config/security.js');

// Routes in order of priority
var users = require('./users/users.routes.js')(app, passport);
var core = require('./core/core.routes.js')(app, passport);

// Expose app
module.exports = app;
