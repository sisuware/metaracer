'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FormSchema = new Schema({
  title: String,
  description: String,
  published: Boolean,
  year: Date,
  fields: Schema.Types.Mixed,
  _locked: {
    type: Number,
    ref: 'User'
  }
});

module.exports = mongoose.model('Form', FormSchema);