// Core routes

'use strict';

// Add controller
var core = require('./core.controller');

module.exports = function coreErrorStatus (app) {
  app.route('/home').get(core.home);
  app.route('/').get(core.index);
};
