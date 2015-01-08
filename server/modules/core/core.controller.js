// core controller

exports.index = function coreIndex (req, res) {
  res.render('index', { title: 'Express, Mongodb, API Starter' });
}
