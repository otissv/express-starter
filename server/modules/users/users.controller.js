// User contoller

'use strict';

// =============================================================================
// Dependencies.
// =============================================================================
var mongoose = require('mongoose');
var passport = require('passport');
var helper = require('../../helpers');
var User = require('./users.model.js');


// =============================================================================
// Methods
// =============================================================================

// Find user by id in database
exports.findUser = function (req, res) {
  User.findById(req.params.user, function (err, user) {
    if (user !== null) {
      return res.json(user);
    } else {
      return res.status(400).send({
        message: helper.getErrorMessage(err, 'user')
      });
    }
  });
};


// Update user details
exports.updateUser = function(req, res) {
  var user = req.user;

  user.save(function(err) {
    if (err) {
      return res.send(400, {
        message: helper.getErrorMessage(err, 'user')
      });
    } else {
      return res.json(user);
    }
  });
};


// Delete user from database
exports.deleteUser = function(req, res) {
  var user = req.user;

  user.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: helper.getErrorMessage(err, 'user')
      });
    } else {
      return res.json(user);
    }
  });
};

// Sends sign up page
exports.signupUser = function (req, res) {
  return res.render('signup', { title: 'Sign up' });
};

// Signs user up
exports.processSigningUpUser = passport.authenticate('local-signup', {
  successRedirect : '/home',
  failureRedirect : '/signup',
  failureFlash : true
});

// Sends sign in page
exports.signinUser = function (req, res) {
  return res.render('signin', { title: 'Sign in' });
};

// Signs user in
exports.processSigningInUser = passport.authenticate('local-signin', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  });

exports.signoutUser = function(req, res) {
  req.logout();
  res.redirect('/');
};
