#!/usr/bin/env node

// backend/server.js

// Server Appication
'use strict';

// =============================================================================
// Dependencies
// =============================================================================
var debug = require('debug')('express-starter');
var app = require('./app.js');


// =============================================================================
// Application Sever
// =============================================================================

app.set('port', process.env.PORT || app.locals.port);

var server = app.listen(app.get('port'), function() {
  console.log('Express server started in ' + app.get('env') + ' mode on http://localhost:' + server.address().port);
});
