// config/locals.js

// Local application variable

'use strict';

// =======================================================================
// Methods
// =======================================================================

module.exports = function(app) {
  var config;
  switch (app.get('env')) {
    case 'development':
      config = require('././env/development.js');
      break;
    case 'production':
      config = require('./env/production.js');
      break;
    default:
      throw new Error('Unknow exection Enviorment:');
  }
  app.locals.baseURL = config.baseURL;
  app.locals.port = config.port;
  app.locals.title = config.title;
  app.locals.description = config.description;
  app.locals.db = config.db;
  app.locals.session = config.session;
};
