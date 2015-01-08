'use strict';

// Database connection


// Bring Mongoose into the project
var mongoose = require( 'mongoose' );

/* Build the connection string.
*  Change to point to database.
*/
var dbURI = 'mongodb://127.0.0.1:27017/test';

// Create the database connection
mongoose.connect(dbURI);

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
