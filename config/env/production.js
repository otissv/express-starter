// cofig/development.js

// Configuration production application variables

'use strict';

// =============================================================================
// Dependencies.
// =============================================================================
var all = require('./all.js');

// =============================================================================
// Configuration
// =============================================================================
module.exports = {
  port: all.port,
  baseURL: 'http://www.yourwebsite.com',
  title:  all.title,
  db: {
    uri: all.db.uri,
    opts: all.db.opts
  },
  session: all.session,
};
