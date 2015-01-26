// config/session.js

'use strict';

// =======================================================================
// Dependencies
// =======================================================================
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('req-flash');
var mongoose = require( 'mongoose');


// =======================================================================
// Session
// =======================================================================

module.exports = function (app, passport) {
  var store = require('mongoose-session')(mongoose)
  // Read cookies (needed for auth)
  app.use(cookieParser());

  // Session
  app.use(session({
    secret: app.locals.session,
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
}
