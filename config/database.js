// conf/database.js

// Database connection

'use strict';

// =============================================================================
// Dependencies
// =============================================================================
var mongoose = require( 'mongoose');


// =============================================================================
// Methods
// =============================================================================

module.exports = function(dbURI, dbOpts) {

  // Create the database connection
  mongoose.connect(dbURI, dbOpts);

  // Event handlers
  mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
  });
  mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
  });

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
    });
  });
};
