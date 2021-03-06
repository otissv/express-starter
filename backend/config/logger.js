// backend/config/logger.js

// Application logger

'use strict';

// =============================================================================
// Methods
// =============================================================================

module.exports = function(app) {
  switch (app.get('env')) {
    case 'development':
      app.use(require('morgan')('dev'));
      break;
    case 'production':
      app.use(require('experss-logger')({
        path: __dirname + '/log/requests.log'
      }));
      break;
    }
};
