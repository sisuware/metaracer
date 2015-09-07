'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var Organization = require('../api/organization/organization.model');
var validateJwt = expressJwt({ secret: config.secrets.session });

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
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id, function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');

        req.user = user;
        next();
      });
    });
}

function isOrganization() {
  return compose()
    .use(function(req, res, next) {
      var subdomain = extractSubdomain(req);

      if (!subdomain) {
        return res.status(401).send('Unauthorized');
      }

      User.model('Organization').findOne({'subdomain': subdomain}, function(err, organization){
        if (err) return next(err);
        if (!organization) return res.status(401).send('Unauthorized');

        req.organization = organization;
        next();
      });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

function isOrganizationOwner() {
  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      Organization.findById(req.params.id, function(err, organization){
        if (err) return next(err);

        console.log(organization, req.user);
        if (!organization || !req.user || parseInt(organization._owner) !== parseInt(req.user._id)) {
          return res.status(403).send('Forbidden');
        }
        next();
      });
    });
}

function isOrganizationAdmin() {
  return compose()
    .use(isAuthenticated())
    .use(isOrganization())
    .use(function meetsRequirements(req, res, next) {
      User.model('Member').findOne({'_user':req.user._id, '_organization':req.organization._id, 'role':'admin'}, function(err, membership){
        if (err) return next(err);
        if (!membership) return res.status(401).send('Unauthorized');

        next();
      });
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60*5 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.status(404).json({ message: 'Something went wrong, please try again.'});
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.isOrganizationOwner = isOrganizationOwner;
exports.isOrganizationAdmin = isOrganizationAdmin;
exports.setTokenCookie = setTokenCookie;