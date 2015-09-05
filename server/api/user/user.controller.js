'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

function validationError(res, err) {
  return res.status(422).json(err);
}

function extractSubdomain(req) {
  var host = req.headers.host;
  var subdomain = host.split('.');
  if (subdomain && subdomain.length === 2) {
    return subdomain[0];
  } else {
    return false;
  }
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 * If user signed up at a subdomain, create the org membership.
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  var subdomain = extractSubdomain(req);

  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);

    if (subdomain) {
      User
        .model('Organization')
        .findOne({'subdomain': req.params.id}, function (err, organization) {
          if(err || !organization) { console.log(err, organization); return false; }

          User.model('Member').create({
            _organization: organization.id,
            _user: user.id,
            role: 'user'
          }, function(err, member){
            if (err) { console.log(err); }
          });
        });
    }

    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  User.findById(req.user._id, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

exports.verifyEmail = function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if(err) return res.status(500).send(err);
    console.log(req.query, req.params, req.query);
    if (req.body.hash && user.validateVerificationHash(req.body.hash)) {
      user.verifiedEmail = true;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Invalid');
    }
  });
}

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.me);
  });
};

exports.membership = function(req, res, next) {
  console.log(req.query, req.params, req.body);

  User.model('Member').findOne(
    {_organization: req.query.organization, _user: req.user._id}, 
    '-_user -_id', 
  function(err, membership){
    if (err) return next(err);
    res.json(membership.state);
  });
};


/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
