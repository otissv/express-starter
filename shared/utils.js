// Shared Utility functions

exports.toCapitaliseCase = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.toTitleCase = function (string)
{
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
