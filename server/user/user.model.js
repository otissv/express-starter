'use strict';
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name cannot be blank'
  },
  email: {
    type: String,
    unique:true,
    required: 'Eamil cannot be blank'
    },
  created: Date,
  modified: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});
mongoose.model('User', userSchema);
