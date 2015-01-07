// core controller

exports.index = function(req, res) {
  res.render('index', { title: 'Express, Mongodb, API Starter' });
}
