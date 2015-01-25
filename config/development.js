// config/development.js

// Configuration development application variables

'use strict';

// =============================================================================
// Dependencies.
// =============================================================================
var all = require('./all.js');

// =============================================================================
// Configuration
// =============================================================================
module.exports = {
  title:  all.title + '- Development Environment',
  db: all.db
};
