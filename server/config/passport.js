// server/config/passport.js

'use strict';

// =============================================================================
// Dependencies.
// =============================================================================
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../modules/users/users.model.js');

// =============================================================================
// Dependencies.
// =============================================================================
module.exports = function() {

  // ===========================================================================
  // Passport setup
  // ===========================================================================

  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);

  });

  // Deserialize sessions
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  // ===========================================================================
  // Local
  // ===========================================================================

  // Sign up
  passport.use('local-signup', new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: 'That email is already taken.'});
        } else {

          var newUser = new User();
          // newUser.firstName   = firstName;
          // newUser.lastName    = lastName;
          newUser.username    = username;
          // newUser.displayName = firstName + ' ' + lastName;
          // newUser.email       = email;
          newUser.password    = newUser.generateHash(password);
          newUser.provider    = 'local';
          newUser.roles       = 'user';
          newUser.updated     = Date.now();
          newUser.lastLogin   = Date.now();

          newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    }
  ));

  // Sign in
  passport.use('local-signin',new LocalStrategy(
    function(username, password, done) {
      User.findOne({username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
};
