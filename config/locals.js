// config/locals.js

module.exports = function(app) {
  switch (app.get('env')) {
    case 'development':
      var config = require('../config/development.js');
      break;
    case 'production':
      var config = require('../config/production.js');
      break;
  }
  app.locals.title = config.title;
  app.locals.description = config.description;
  app.locals.db = config.db;
}
