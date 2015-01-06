var express = require('express');
var mongoose = require('mongoose');
require('./user.model.js');
var User = mongoose.model('User');

// upcase firt letter
var capitaliseFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Get the error message from error object
var getErrorMessage = function(model, err) {
  var message = '';
  var model = capitaliseFirstLetter(model);

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = model + ' already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

exports.read = function(req, res) {
  res.json({
    title: 'User read',
    type: 'GET',
    res: 200
  });
};

exports.create = function(req, res) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    modified: Date.now(),
    lastLogin: Date.now()
  });

  user.save (function(err) {
    if (err) {
      return res.status(400).send(user
        //message: getErrorMessage('user', err)
      );
    } else {
      res.json(user);
    }
  });
};
