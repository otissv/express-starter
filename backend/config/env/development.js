// config/development.js

// Configuration development application variables

'use strict';

// =============================================================================
// Dependencies.
// =============================================================================
var all = require('./default.js');

// =============================================================================
// Configuration
// =============================================================================
module.exports = {
  port: all.port,
  baseURL: 'http://localhost:' + all.port,
  title:  all.title + '- Development Environment',
  db: all.db,
  session: all.session
};
