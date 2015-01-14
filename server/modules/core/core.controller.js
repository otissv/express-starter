// Core controller

'use strict';

exports.index = function(req, res) {
  res.render('index', { title: 'Express, Mongodb, API Starter' });
};

exports.home = function(req, res) {
  res.render('home', { title: 'Home Page' });
};
