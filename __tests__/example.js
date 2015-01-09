'use strict';

// __tests__/example.js

var expect = require('chai').expect;

describe('sum', function() {
  it('adds 1 + 2 to equal 3', function() {
    var sum = function sum(value1, value2) {
      return value1 + value2;
    };
    expect(sum(1, 2)).to.equal(3);
  });
});
