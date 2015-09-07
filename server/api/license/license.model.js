'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var LicenseSchema = new Schema({
  created: Date,
  expires: Date,
  _member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  _number: {
    type: Schema.Types.ObjectId,
    ref: 'Number',
    required: true
  },
  _season: {
    type: Schema.Types.ObjectId,
    ref: 'Season',
    required: true
  }
});

LicenseSchema
  .path('created')
  .validate(function(created){
    return _.isDate(created);
  }, 'Created date must be valid');

LicenseSchema
  .path('expires')
  .validate(function(expires){
    return _.isDate(expires);
  }, 'Expires date must be valid');

LicenseSchema
  .pre('save', function(next){
    if (!this.isNew) { return next(); }

    this.created = Date.now();
  });


module.exports = mongoose.model('License', LicenseSchema);