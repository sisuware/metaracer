'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MemberSchema = new Schema({
  _organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  role: {
    type: String,
    default: 'user'
  }
});

var validatePresenceOf = function(value) {
  return value && value.length;
};

MemberSchema
  .pre('save', function(next){
    if (!this.isNew) { return next(); }

    // if (!validatePresenceOf(this._organization) || !validatePresenceOf(this._user)) {
    //   next(new Error('Invalid organization'));
    // }

    // check for exising memberships?
    next();

  });

module.exports = mongoose.model('Member', MemberSchema);