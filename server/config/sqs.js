'use strict';

var config = require('./environment');
var aws = require('aws-sdk');
aws.config.update(config.aws.sqs);

module.exports = function() {
  var sqs = new aws.SQS();
  var queueUrl;

  sqs.getQueueUrl(config.aws.sqs.params, function(err, data) {
    if (err) throw err;
    queueUrl = data.QueueUrl;

    subscribeClients(sqs, queueUrl);
  });
}

function subscribeClients(sqs, queueUrl) {
  console.info('SQS Connected: ', queueUrl);

  require('../api/user/user.sqs').subscribe(sqs, queueUrl);
}