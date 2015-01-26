// config/views.js

// Application view templating

'use strict';

// =============================================================================
// Dependencies
// =============================================================================
var swig = require('swig');
var path = require('path');

// =============================================================================
// Methods
// =============================================================================

module.exports = function(app) {
  // View engine setup
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');

  // Location of view folders
  app.set('views', path.join(__dirname, '../server/core/views/'));
};
