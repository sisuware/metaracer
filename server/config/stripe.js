'use strict';

var config = require('./environment');
var Stripe = require('stripe')(config.stripe.secretKey);

module.exports = function() {
  console.info('Stripe Initialized');

  require('../api/bank/bank.stripe')(Stripe);
}

