'use strict';

var _ = require('lodash');
var Motorcycle = require('./motorcycle.model');

// Get list of motorcycles
exports.index = function(req, res) {
  Motorcycle.find(function (err, motorcycles) {
    if(err) { return handleError(res, err); }
    return res.json(200, motorcycles);
  });
};

// Get a single motorcycle
exports.show = function(req, res) {
  Motorcycle.findById(req.params.id, function (err, motorcycle) {
    if(err) { return handleError(res, err); }
    if(!motorcycle) { return res.send(404); }
    return res.json(motorcycle);
  });
};

// Creates a new motorcycle in the DB.
exports.create = function(req, res) {
  Motorcycle.create(req.body, function(err, motorcycle) {
    if(err) { return handleError(res, err); }
    return res.json(201, motorcycle);
  });
};

// Updates an existing motorcycle in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Motorcycle.findById(req.params.id, function (err, motorcycle) {
    if (err) { return handleError(res, err); }
    if(!motorcycle) { return res.send(404); }
    var updated = _.merge(motorcycle, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, motorcycle);
    });
  });
};

// Deletes a motorcycle from the DB.
exports.destroy = function(req, res) {
  Motorcycle.findById(req.params.id, function (err, motorcycle) {
    if(err) { return handleError(res, err); }
    if(!motorcycle) { return res.send(404); }
    motorcycle.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}