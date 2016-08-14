'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BankSchema = new Schema({
  _organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  }, 
  label: String,
  country: String,
  legal_entity: Schema.Types.Mixed,
  external_account: Schema.Types.Mixed,
  tos_acceptance: Schema.Types.Mixed,
  stripe: Schema.Types.Mixed
});

BankSchema
  .pre('remove', function(next){

  });

BankSchema
  .post('save', function(bank){

  });

module.exports = mongoose.model('Bank', BankSchema);