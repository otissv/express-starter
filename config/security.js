//  config/security.js

// Appplication secruity

'use strict';

// =============================================================================
// Dependencies
// =============================================================================
var csrf = require('csurf');
var helmet = require('helmet');

// =============================================================================
// Methods
// =============================================================================

module.exports = function (app) {

  // Disable x-powered-by
  app.disable('x-powered-by');

  // Cross-site request forgery
  app.use(csrf());
  app.use(function(req, res, next) {
    res.locals._csrfToken = req.csrfToken();
    next();
  });

  // Content Security Policy
  app.use(helmet.csp({
    defaultSrc: ['"self"'],
    scriptSrc: ['*.google-analytics.com'],
    styleSrc: ['"unsafe-inline"'],
    imgSrc: ['*.google-analytics.com'],
    connectSrc: ['"none"'],
    fontSrc: [],
    objectSrc: [],
    mediaSrc: [],
    frameSrc: []
  }));

  // X-XSS-Protection
  app.use(helmet.xssFilter());

  // X-Frame: Deny
  app.use(helmet.xframe());

  // Strict-Transport-Security
  app.use(helmet.hsts({
    maxAge: 7776000000,
    includeSubdomains: true
  }));

  // Sniff mimetypes
  app.use(helmet.noSniff());

  // IE, restrict untrusted HTML
  app.use(helmet.ieNoOpen());

  // enforce https
  // app.use(require('express-enforces-ssl'));
};
