'use strict';

var _ = require('lodash');
var Transponder = require('./transponder.model');

// Get list of transponders
exports.index = function(req, res) {
  Transponder.find(function (err, transponders) {
    if(err) { return handleError(res, err); }
    return res.json(200, transponders);
  });
};

// Get a single transponder
exports.show = function(req, res) {
  Transponder.findById(req.params.id, function (err, transponder) {
    if(err) { return handleError(res, err); }
    if(!transponder) { return res.send(404); }
    return res.json(transponder);
  });
};

// Creates a new transponder in the DB.
exports.create = function(req, res) {
  Transponder.create(req.body, function(err, transponder) {
    if(err) { return handleError(res, err); }
    return res.json(201, transponder);
  });
};

// Updates an existing transponder in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Transponder.findById(req.params.id, function (err, transponder) {
    if (err) { return handleError(res, err); }
    if(!transponder) { return res.send(404); }
    var updated = _.merge(transponder, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, transponder);
    });
  });
};

// Deletes a transponder from the DB.
exports.destroy = function(req, res) {
  Transponder.findById(req.params.id, function (err, transponder) {
    if(err) { return handleError(res, err); }
    if(!transponder) { return res.send(404); }
    transponder.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}