'use strict';
var expect = require('chai').expect;
var app = require('../../server/app.js');
var request = require('supertest')(app);
var mongoose = require('mongoose');

var user = {
  post: {
    name: 'jane Doe',
    email: 'jane@doe.com'
  },
  get: {
    _id: '54b12231ce166d4d6c6087e5',
    name: 'John Smith',
    email: 'John@smith.com',
    lastLogin: '2015-01-10T12:59:29.753Z',
    modified: '2015-01-10T12:59:29.753Z',
    __v: 0
  }
};

var drop = {
  collection: function(col) {
    mongoose.connection.db.dropCollection(col, function(err, result) {
      if(err) {
        console.log(err);
      } else {
        console.log('Test Database clean');
      }
    });
  }
};


describe('User Routes', function(){


  it('Creates a new user in the database', function(done){
    drop.collection('users');

    request
      .post("/users/new")
      .send(user.post)
      .expect(200, done);
  });

  it('Gets a user from the database', function(done){
     request
       .get('/users/' + user.get._id)
       .set('Accept', 'application/json')
       .expect('Content-Type', /json/)
       .expect(200, done);
    });

});
