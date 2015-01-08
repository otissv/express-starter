// Core controller

'use strict';

exports.index = function coreIndex (req, res) {
  res.render('index', { title: 'Express, Mongodb, API Starter' });
};
