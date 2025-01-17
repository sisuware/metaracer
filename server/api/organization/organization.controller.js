'use strict';

var _ = require('lodash');
var Organization = require('./organization.model');

// Get list of organizations
exports.index = function(req, res) {
  Organization
    .find()
    .populate('_owner', 'email')
    .exec(function (err, organizations) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(organizations);
    });
};

// Get a single organization
exports.show = function(req, res) {
  Organization.findById(req.params.id, function (err, organization) {
    if(err) { return handleError(res, err); }
    if(!organization) { return handleNotFound(res, err); }
    return res.json(organization);
  });
};

// Get a single organization, by it's subdomain
exports.subdomain = function(req, res) {
  Organization.findOne({'subdomain': req.params.id}, '-_owner', function (err, organization) {
    if(err) { return handleError(res, err); }
    if(!organization) { return handleNotFound(res, err); }
    return res.json(organization);
  });
};

// Creates a new organization in the DB.
exports.create = function(req, res) {
  Organization.create(req.body, function(err, organization) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(organization);
  });
};

// Updates an existing organization in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Organization.findById(req.params.id, function (err, organization) {
    if(err) { return handleError(res, err); }
    if(!organization) { return handleNotFound(res, err); }

    var updated = _.merge(organization, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(organization);
    });
  });
};

// Deletes a organization from the DB.
exports.destroy = function(req, res) {
  Organization.findById(req.params.id, function (err, organization) {
    if(err) { return handleError(res, err); }
    if(!organization) { return handleNotFound(res, err); }

    organization.remove(function(err) {
      
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

function handleNotFound(res, err) {
  res.status(404).send('Not Found');
}