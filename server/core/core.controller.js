// sever/core/core.controller.js

// Core controller

'use strict';


// =============================================================================
// Methods
// =============================================================================

exports.index = function(req, res) {
  res.render('index');
};

exports.home = function(req, res) {
  res.render('home', { title: 'Home Page' });
};
