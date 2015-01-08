// User routes

var user = require ('./users.controller');

module.exports = function userRoutes (app) {
  app.route('/users/new').post(user.create);
  app.route('/users/:user')
    .get(user.read)
    .put(user.update)
    .delete(user.delete)
  // app.route('/auth/signup').post(users.signup);
  // app.route('/auth/signin').post(users.signin);
  // app.route('/auth/signout').get(users.signout);
};
