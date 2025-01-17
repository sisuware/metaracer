'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MotorcycleSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Motorcycle', MotorcycleSchema);