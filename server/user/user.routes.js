var user = require ('./user.controller');



module.exports = function(app) {
  app.route('/user').get(user.read);
  app.route('/user/new').post(user.create);
  // app.route('/user/edit').post(user.update)
  // app.route('/user/delete').post(user.delete)
  // app.route('/user/login').post(user.login)
  // app.route('/user/logout').get(user.logot);
};
