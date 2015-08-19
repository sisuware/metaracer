'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FormSchema = new Schema({
  title: String,
  description: String,
  hidden: Boolean,
  year: Date,
  fields: Schema.Types.Mixed
});

module.exports = mongoose.model('Form', FormSchema);