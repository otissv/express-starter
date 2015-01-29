// backend/config/session.js

// Application session

'use strict';

// =======================================================================
// Dependencies
// =======================================================================
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('req-flash');

// =======================================================================
// Session
// =======================================================================

module.exports = function (app, passport, store) {

  // Read cookies (needed for auth)
  app.use(cookieParser());

  // Session
  app.use(session({
    secret: app.locals.session,
    store: store,
    saveUninitialized: true,
    resave: true
  }));

  // Flash messages
  app.use(flash({ locals: 'flash' }));

};
