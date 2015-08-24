'use strict';

var should = require('should');
var app = require('../../app');
var Organization = require('./organization.model');
var User = require('../user/user.model');

var organization = new Organization({
  name: 'Sisuware',
  acronym: 'SISU',
  _owner: 1234
});

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

describe('Organization Model', function() {
  before(function(done) {
    // Clear users before testing
    Organization.remove().exec().then(function() {
      User.remove().exec().then(function() {
        user.save(function(err, user) {
          organization._owner = user.id;
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    Organization.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with a valid user', function(done) {
    should.exist(user.id);
    done();
  });

  it('should begin with no organizations', function(done) {
    Organization.find({}, function(err, organizations) {
      organizations.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate organization', function(done) {
    var orgDup = new Organization({
      name: 'Sisuware',
      acronym: 'SISU',
      _owner: user.id
    });

    organization.save(function() {
      orgDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without a name', function(done) {
    organization.name = '';
    organization.save(function(err) {
      should.exist(err.errors.name);
      done();
    });
  });

  it('should fail when saving without a acronym', function(done) {
    organization.acronym = '';
    organization.save(function(err) {
      should.exist(err.errors.acronym);
      done();
    });
  });

  it('should fail when saving without a subdomain', function(done) {
    organization.subdomain = '';
    organization.save(function(err) {
      should.exist(err.errors.subdomain);
      done();
    });
  });

  it('should fail when saving without a _owner', function(done) {
    organization._owner = '';
    organization.save(function(err) {
      should.exist(err.errors._owner);
      done();
    });
  });
});
