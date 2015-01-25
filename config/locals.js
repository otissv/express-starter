// config/locals.js

// local application variable

'use strict';

module.exports = function(app) {
  var config;
  switch (app.get('env')) {
    case 'development':
      config = require('../config/development.js');
      break;
    case 'production':
      config = require('../config/production.js');
      break;
    default:
      throw new Error('Unknow exection Enviorment:');
  }
  app.locals.title = config.title;
  app.locals.description = config.description;
  app.locals.db = config.db;
};
