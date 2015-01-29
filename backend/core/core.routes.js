// backend/core/core.routes.js

// Core routes

'use strict';

// =============================================================================
// Dependencies.
// =============================================================================
var core = require('./core.controller');


// =============================================================================
// Routes in order of priority
// =============================================================================

module.exports = function coreErrorStatus (app) {
  app.route('/').get(core.index);

  // =============================================================================
  // Error Handler
  // =============================================================================

  // 404 catch-all handler
  app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
  });

  // 500 catch-all handler
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
  });
};
