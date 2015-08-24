'use strict';

var should = require('should');
var app = require('../../app');
var Member = require('./member.model');
var Organization = require('../organization/organization.model');
var User = require('../user/user.model');

var organization = new Organization({
  name: 'Sisuware',
  acronym: 'SISU'
});

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

var member = new Member();

describe('Member Model', function() {
  before(function(done) {
    // Clear users before testing
    Member.remove().exec().then(function() {
      organization.save(function(err, organization){
        member._organization = organization.id;
      });

      user.save(function(err, user){
        member._user = user.id;
        member.role = 'user';

        done();
      });  
    });
  });

  afterEach(function(done) {
    Member.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with a valid user', function(done) {
    should.exist(user.id);
    done();
  });

  it('should begin with a valid organization', function(done) {
    should.exist(organization.id);
    done();
  });

  it('should begin with no members', function(done) {
    Member.find({}, function(err, members) {
      members.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate membership', function(done) {
    var memberDup = new Member({_organization: organization.id, _user: user.id});

    member.save(function() {
      memberDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without a _organziation', function(done){
    member._organization = '';
    member.save(function(err){
      should.exist(err.errors._organization);
      done();
    });
  });

  it('should fail when saving without a _user', function(done){
    member._user = '';
    member.save(function(err){
      should.exist(err.errors._user);
      done();
    });
  });
});