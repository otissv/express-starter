// User routes

'use strict';

// =============================================================================
// Dependencies.
// =============================================================================
var user = require ('./users.controller.js');


// =============================================================================
// Methods
// =============================================================================

module.exports = function userRoutes (app) {
  app.route('/users/:user')
    .get(user.findUser)
    .put(user.updateUser)
    .delete(user.deleteUser);
  app.route('/signup').get(user.signupUser);
  app.route('/signup').post(user.processSigningUpUser);
  app.route('/signin').get(user.signinUser);
  app.route('/signin').post(user.processSigningInUser);
  app.route('/signout').get(user.signoutUser);
};
