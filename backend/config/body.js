// backend/config/body.js

// Body parser

'use strict';

// =============================================================================
// Dependencies
// =============================================================================
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// =============================================================================
// Methods
// =============================================================================

module.exports = function(app) {
  // Parse application/json
  app.use(bodyParser.json());

  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // Over ride request header
  app.use(methodOverride());
  // Should be placed before express.static
};
