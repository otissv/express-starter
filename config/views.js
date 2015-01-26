// config/views.js

// View templating

'use strict';

// =============================================================================
// Dependencies
// =============================================================================
var swig = require('swig');

// =============================================================================
// Methods
// =============================================================================

module.exports = function(app, path) {
  // View engine setup
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');

  // Location of view folders
  app.set('views', path.join(__dirname, '../server/core/views/'));
};
