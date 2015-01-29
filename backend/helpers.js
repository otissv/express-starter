// backend/helpers.js

// Helper Utilities

'use strict';

// Dependencies
var activesupport = require('activesupport');
var glob = require('glob');

// Replace charachers in string
exports.stringReplace = function (str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
};

//  Error messages
exports.getErrorMessage = function  (err, doc) {
  var message = '';
  doc = doc.humanize();

  if(err !== null) {
    if (err.code) {
    switch (err.code) {
      case 11000:
        case 11001:
          message = doc + ' already exists';
          break;
        default:
          message = 'Something went wrong';
        }
    } else {
      if (err.errors !== undefined) {
        for (var errName in err.errors) {
          message = err.errors[errName].message;
        }
      }
    }
  } else {
    message = doc + ' does not exit';
  }
  return message;
};
