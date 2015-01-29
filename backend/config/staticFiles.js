// backend/config/staticFiles.js

// Application Static files

'use strict';

// =============================================================================
// Dependencies
// =============================================================================
var compress = require('compression');
var path = require('path');

// =============================================================================
// Methods
// =============================================================================

module.exports = function(app, express) {
  app.use(compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Static files locations
  app.use(express.static(path.join(__dirname, '../../public/')));
};
