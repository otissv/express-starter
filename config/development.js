// config/development.js

// Configuration development application variables

'use strict';

// =============================================================================
// Dependencies.
// =============================================================================
var configAll = require('./all.js')

// =============================================================================
// Configuration
// =============================================================================
module.exports = {
  title:  configAll.title + '- Development Environment',
  db: 'mongodb://127.0.0.1:27017/test'
}
