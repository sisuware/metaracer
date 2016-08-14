'use strict';

var Q = require('q');
var Bank = require('./bank.model');
var _ = require('lodash');
var accountKeys = ['id','external_accounts','verification','legal_entity','tos_acceptance'];

module.exports = function(Stripe) {
  Bank
    .schema.post('save', function (bank){
      if (bank.stripe) { return false; }

      createManagedStripeAccount(bank)
        .then(persistStripeAccount.bind(null, bank), handleError);

    });

  function persistStripeAccount (bank, account) {
    console.log(bank, account);
    Bank
      .findById(bank._id)
      .update({
        stripe: account
      }, handleError);
  }

  function createManagedStripeAccount (bank) {
    var dfr = Q.defer();
    
    Stripe.accounts.create({
      managed: true,
      country: bank.country,
      email: 'organization_' + bank._organization + '@metaracer.com'
    }, function(err, account){
      if (err) {
        dfr.reject(err);
      } else {
        dfr.resolve(_.pick(account, accountKeys));
      }
    });

    return dfr.promise;
  }

  function handleError(err) {
    console.error(err);
  }
}
