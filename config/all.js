// sever/env/all

var secret = require('../.credentials.js');

module.exports = {
  title: 'Express Starter',
  description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
  keywords: 'MongoDB, Express, AngularJS, Node.js',
  port: process.env.PORT || 3000,
  secret: secret.sessionSecret
}
