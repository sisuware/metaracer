'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Member = require('../member/member.model');

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

  // Validate empty acronym
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

/** 
 * Post-save hook
 */
OrganizationSchema
  .post('save', function(organization) {
    debugger;

    Member.create({
      '_organization': organization._id,
      '_user': organization._owner,
      'role': 'admin'
    }, function(err, member){
      console.log(err, member);
    });
  });

/** 
 * Post-remove hook
 */
// OrganizationSchema
//   .post('remove', function(organization) {

//     Member.find({'_organization': organization._id}, function(members){
//       console.log(members);
//     });
//   });


module.exports = mongoose.model('Organization', OrganizationSchema);