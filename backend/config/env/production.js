// cofig/development.js

// Configuration production application variables

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
  baseURL: 'http://www.yourwebsite.com',
  title:  all.title,
  db: {
    uri: 'path/to/database/location',
    opts: all.db.opts
  },
  session: all.session,
};
