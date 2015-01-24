// cofig/development.js

// Configuration production application variables

'use strict';

// =============================================================================
// Dependencies.
// =============================================================================
var configAll = require('./all.js')

// =============================================================================
// Configuration
// =============================================================================
module.exports = {
  title:  configAll.title,
  db: 'url/to/database'
}
