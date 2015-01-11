//  Mongodb actions
'use strict';

// Conncet to database
var conn = new Mongo();
var db = conn.getDB('test');

// Delete users collection
db.users.drop();

// TODO
// Create test data and save to test.data.js
// require test.data.js and insert it into database

db.users.insert({firstName: 'paul', email: 'spencer@virginie.com'});
var user = db.users.find().limit(1);
