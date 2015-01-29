// backend/app.js

// Express application

'use strict';

// =============================================================================
// Configuration
// =============================================================================

var express = require('express');
var app = express();
var env = require('../backend/config/env.js')(app);
var db = require('../backend/config/database.js').connection(app.locals.db.uri, app.locals.db.opts);
var passport = require('passport');
var favicon = require('serve-favicon');


// =============================================================================
// Middleware
// =============================================================================

// View engine setup
var views = require('../backend/config/views.js')(app);

// Uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// Application logger
var logger = require('../backend/config/logger.js')(app);

// Body paser
var body = require('../backend/config/body.js')(app);

// Static files
var staticFiles = require('../backend/config/staticFiles.js')(app, express);

// Session
var session = require('../backend/config/session.js')(app, passport, require('../backend/config/database.js').store());


// Authorisation
var auth = require('../backend/config/auth.js')(app, passport);

// Authorisation Strategies
var authStrategies = require('./users/user.auth.js')(passport);

// Security
var security = require('../backend/config/security.js')(app);

// Rourtes order is important!
var user = require('../backend/users/users.routes.js')(app, passport);
var core = require('../backend/core/core.routes.js')(app, passport);


// Expose app
module.exports = app;
