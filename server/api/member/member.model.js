'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleStates = {
  'admin': 'organizations.show',
  'user': 'membership.new',
  'member': 'membership',
  'inactive': 'membership.inactive'
};

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

function validatePresenceOf(value) {
  return value && String(value).length;
}

function memberState(member) {
  var state = 'main';
  if (member.role) {
    state = {
      'go': roleStates[member.role], 
      'params': {'id': member._organization }
    };
  }

  return state;
}



MemberSchema
  .virtual('state')
  .get(function(){
    return {
      'role': this.role,
      'state': memberState(this)
    };
  });

MemberSchema
  .pre('save', function(next){
    var self = this;
    if (!this.isNew) { return next(); }

    if (!validatePresenceOf(this._organization)) {
      return next(new Error('Invalid organization'));
    }

    if (!validatePresenceOf(this._user)) {
      return next(new Error('Invalid user'));
    }

    this.constructor.findOne({
      _organization: self._organization,
      _user: self._user
    }, function(err, membership){
      if (err) throw err;
      if (membership && membership._id) return next(new Error('Membership already exists.'));

      next();
    });
  });

module.exports = mongoose.model('Member', MemberSchema);