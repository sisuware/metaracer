'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FormSchema = new Schema({
  title: String,
  description: String,
  published: Boolean,
  fields: Schema.Types.Mixed,
  _season: {
    type: Schema.Types.ObjectId,
    ref: 'Season'
  },
  _organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  _locked: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Form', FormSchema);