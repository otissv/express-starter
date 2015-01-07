// Server helper functions

var util = require('../../shared/utils');

exports.getErrorMessage = function(err, doc) {
  var message = '';
  var doc = util.toCapitaliseCase(doc);

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
      message = doc + ' does not exit'
    }
  }
  return message;
};
