'use strict';
var expect = require('chai').expect;
var app = require('../../server/app.js');
var request = require('supertest')(app);

describe('Core routes', function(){

  it('GET / and respond with html, 200', function(done){
    request
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

});
