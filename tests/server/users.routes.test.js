'use strict';
var expect = require('chai').expect;
var app = require('../../server/app.js');
var request = require('supertest')('http://localhost:3000');
var mongoose = require('mongoose');

var user = [
  {username: 'janedoe',   password: 'xyz'},
  {username: 'johnsmith', password: 'xyz'}
];


describe('User Routes -', function(){

  it('Gets sign up page', function(done){
    request
    .get('/signup')
    .expect(200, done);
  });

});
