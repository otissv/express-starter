// database/connection.js

// Database connection

'use strict';
var mongoose = require( 'mongoose');

module.exports = function(dbURI, dbOpts) {
  // Bring Mongoose into the project


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
