'use strict';

var path = require('path');
var _ = require('lodash');
var root = path.normalize(__dirname + '/../../..');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: root,

  // Server port
  port: process.env.PORT || 443,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'metaracer-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin', 'manager'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  helmet: {
    maxAge: 31536000000, //one year
    includeSubdomains: true,
    force: true
  },

  https: {
    keyFile: path.normalize(root + '/ssl.pem'),
    certFile: path.normalize(root + '/ssl.crt'),
    ciphers: [
      "ECDHE-RSA-AES256-SHA384",
      "DHE-RSA-AES256-SHA384",
      "ECDHE-RSA-AES256-SHA256",
      "DHE-RSA-AES256-SHA256",
      "ECDHE-RSA-AES128-SHA256",
      "DHE-RSA-AES128-SHA256",
      "HIGH",
      "!aNULL",
      "!eNULL",
      "!EXPORT",
      "!DES",
      "!RC4",
      "!MD5",
      "!PSK",
      "!SRP",
      "!CAMELLIA"
    ].join(':')
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  },

  aws: {
    ses: {
      accessKeyId: process.env.AWS_SES_ID,
      secretAccessKey: process.env.AWS_SES_KEY,
      region: 'us-west-2'
    },
    sqs: {
      accessKeyId: process.env.AWS_SQS_ID,
      secretAccessKey: process.env.AWS_SQS_KEY,
      region: 'us-west-2',
      apiVersions: '2012-11-05',
      params: {
        QueueName: 'metaracer-dev'
      }
    }
  },

  stripe: {
    uri: 'https://api.stripe.com'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
