// Server helper functions

'use strict';

var activesupport = require('activesupport');

// Replace charachers in string
exports.stringReplace = function stringReplace(str, find, replace){
  return str.replace(new RegExp(find, 'g'), replace);
};

//  Error messages
exports.getErrorMessage = function getErrorMessage (err, doc) {
  var message = '';
  doc = doc.humanize();

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = doc + ' already exists';
        break;
      default:
          message = 'Something went wrong';
        }
  }
  else {
    if (err.errors !== undefined) {
      for (var errName in err.errors) {
        message = err.errors[errName].message;
      }
    } else {
      message = doc + ' does not exit';
    }
  }
  return message;
};
