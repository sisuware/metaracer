'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  name: String,
  acronym: String,
  subdomain: {
    type: String,
    index: true
  },
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */

// Validate empty name
 OrganizationSchema
  .path('name')
  .validate(function(name) {
    return name.length;
  }, 'Name cannot be blank');

  // Validate empty name
 OrganizationSchema
  .path('acronym')
  .validate(function(acronym) {
    return acronym.length;
  }, 'Acronym cannot be blank');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
OrganizationSchema
  .pre('save', function(next) {
    if (!this.isNew) { return next(); }

    if (!validatePresenceOf(this.acronym)) {
      next(new Error('Invalid acronym'));
    } else {
      this.subdomain = this.acronym.toLowerCase();
      next();
    }
  });

module.exports = mongoose.model('Organization', OrganizationSchema);