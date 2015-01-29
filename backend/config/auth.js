// backend/config/session.js

// Application session

// =======================================================================
// Session
// =======================================================================

module.exports = function (app, passport) {

  // Initialise authentication
  app.use(passport.initialize());

  // persistent login sessions
  app.use(passport.session());

  app.use(function (req, res, next) {
    res.locals.login = req.user;
    next();
  });
};
