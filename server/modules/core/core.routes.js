// Core routes

var core = require('./core.controller');

module.exports = function(app) {
  app.route('/').get(core.index);
};
