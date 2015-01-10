// User contoller

'use strict';

// Dependencies
var mongoose = require('mongoose');
var helper = require('../../helpers');
require('./users.model.js');
var User = mongoose.model('User');

// Find user by id in database
exports.read = function userRead(req, res) {
  User.findById(req.params.user, function (err, user) {
    if (err) {
      return res.status(400).send({
        message: helper.getErrorMessage(err, 'user')
      });
    } else {
      return res.json(user);
    }
  });
};

// Create new user in database
exports.create = function userCreate(req, res) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    modified: Date.now(),
    lastLogin: Date.now()
  });
  user.save (function(err) {
    if (err) {
      return res.status(400).send({
        message: helper.getErrorMessage(err, 'user')
      });
    } else {
      res.json(user);
    }
  });
};

// Update user details
exports.update = function userUpdate (req, res) {
  var user = req.user;

  user.save(function(err) {
    if (err) {
      return res.send(400, {
        message: helper.getErrorMessage(err, 'user')
      });
    } else {
      res.json(user);
    }
  });
};


// Delete user from database
exports.delete = function userDelete (req, res) {
  var user = req.user;

  user.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: helper.getErrorMessage(err, 'user')
      });
    } else {
      res.json(user);
    }
  });
};
