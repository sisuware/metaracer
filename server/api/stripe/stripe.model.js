'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StripeSchema = new Schema({
  _organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  }, 
  banking: Schema.Type.Mixed,
  identity: Schema.Type.Mixed,
  account: Schema.Type.Mixed
});

StripeSchema
  .post('save', function())

module.exports = mongoose.model('Stripe', StripeSchema);