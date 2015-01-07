// Helper functions

exports.toCapitalise = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.toTitleCase = function (string)
{
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

exports.getErrorMessage = function(err, doc) {
  var message = '';
  var doc = this.toCapitalise(doc);

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
