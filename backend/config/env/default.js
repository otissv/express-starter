// config/all.js

// Configuration variable

'use strict';
// =============================================================================
// Dependencies.
// =============================================================================
var secret = require('../secret.js');

// =============================================================================
// Configuration
// =============================================================================
module.exports = {
  title: 'Express Starter',
  description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
  keywords: 'MongoDB, Express, AngularJS, Node.js',
  port: process.env.PORT || 3000,
  session: secret.session,
  db: {
    uri: 'mongodb://127.0.0.1:27017/test',
    opts: {
      server: {
        socketOptions: { keepAlive: 1}
      }
    }
  }
};
