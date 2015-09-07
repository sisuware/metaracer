'use strict';

var _ = require('lodash');
var Season = require('./season.model');

// Get list of seasons
exports.index = function(req, res) {
  Season.find({'_organization': req.organization._id}, function (err, seasons) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(seasons);
  });
};

// Get list of seasons
exports.years = function(req, res) {
  Season
    .where({'_organization': req.organization._id})
    .select('year')
    .exec(function (err, seasons) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(seasons);
    });
};

// Get a single season
exports.show = function(req, res) {
  Season.findById(req.params.id, function (err, season) {
    if(err) { return handleError(res, err); }
    if(!season) { return res.send(404); }
    return res.json(season);
  });
};

// Creates a new season in the DB.
exports.create = function(req, res) {
  Season.create(req.body, function(err, season) {
    if(err) { return handleError(res, err); }
    return res.json(201, season);
  });
};

// Updates an existing season in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Season.findById(req.params.id, function (err, season) {
    if (err) { return handleError(res, err); }
    if(!season) { return res.send(404); }
    var updated = _.merge(season, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, season);
    });
  });
};

// Deletes a season from the DB.
exports.destroy = function(req, res) {
  Season.findById(req.params.id, function (err, season) {
    if(err) { return handleError(res, err); }
    if(!season) { return res.send(404); }
    season.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}