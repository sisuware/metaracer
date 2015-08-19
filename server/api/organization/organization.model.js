'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  name: String,
  acronym: String,
  subdomain: String,
  _owner: {
    type: Number,
    ref: 'User'
  }
});



module.exports = mongoose.model('Organization', OrganizationSchema);