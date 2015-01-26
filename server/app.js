// sever/app.js

// Express application

'use strict';

// =============================================================================
// Configuration
// =============================================================================

var express = require('express');
var app = express();
var locals = require('../config/locals.js')(app);
var db = require('../config/database.js')(app.locals.db.uri, app.locals.db.opts);
var passport = require('passport');
var favicon = require('serve-favicon');

// =============================================================================
// Middleware
// =============================================================================

// Bootstrap passport config
var auth = require('./users/user.auth.js')(passport);

// View engine setup
var views = require('../config/views.js')(app);

// Uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// Application logger
var logger = require('../config/logger.js')(app);

// Body paser
var body = require('../config/body.js')(app);

// Static files
var staticFiles = require('../config/staticFiles.js')(app, express);

// Session
var session = require('../config/session.js')(app, passport);

// Security
var security = require('../config/security.js')(app);

// Routes in order of priority
var user = require('./users/users.routes.js')(app, passport);
var core = require('./core/core.routes.js')(app, passport);

// Expose app
module.exports = app;
