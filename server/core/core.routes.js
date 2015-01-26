// sever/core/core.routes.js

// Core routes

'use strict';

// =============================================================================
// Dependencies.
// =============================================================================
var core = require('./core.controller');
var users = require('../users/users.controller.js');


// =============================================================================
// Routes in order of priority
// =============================================================================

module.exports = function coreErrorStatus (app) {
  app.route('/home').get(users.requiresLogin, core.home);
  app.route('/').get(core.index);
};
