'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SeasonSchema = new Schema({
  year: Number,
  license: {
    renewal: {
      start: Date,
      end: Date
    },
    valid: {
      start: Date,
      end: Date
    }
  },
  _organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  }
});

module.exports = mongoose.model('Season', SeasonSchema);