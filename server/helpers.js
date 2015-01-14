// Server helper functions
'use strict';

// Dependencies
var activesupport = require('activesupport');
var _ = require('lodash');
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

/**
* Get files by glob patterns
*/
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
  // For context switching
  var _this = this;

  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

  // The output array
  var output = [];

  // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function(globPattern) {
      output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      glob(globPatterns, {
        sync: true
      }, function(err, files) {
        if (removeRoot) {
          files = files.map(function(file) {
            return file.replace(removeRoot, '');
          });
        }

        output = _.union(output, files);
      });
    }
  }

  return output;
};
