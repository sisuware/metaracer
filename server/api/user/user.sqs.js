'use strict';

var User = require('./user.model');

exports.subscribe = function(sqs, queueUrl) {
  sqs = sqs;
  queueUrl = queueUrl;

  User.schema.post('save', sendMessage);

  function sendMessage(user) {
    if (user.verifiedEmail) return false;

    var message = {
      MessageBody: 'email:verification',
      QueueUrl: queueUrl,
      MessageAttributes: {
        email: {
          DataType: 'String',
          StringValue: user.email
        },
        fullName: {
          DataType: 'String',
          StringValue: user.fullName
        },
        verificationHash: {
          DataType: 'String',
          StringValue: user.verificationHash || user.makeVerificationHash()
        }
      }
    };

    sqs.sendMessage(message, function(err, data) {
      if (err) throw err;
    });
  }
}