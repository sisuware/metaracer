'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');

var user;

describe('User Model', function() {
  beforeEach(function(done) {
    // Clear users before testing
    User.remove().exec().then(function() {
      user = new User({
        provider: 'local',
        firstName: 'Fake',
        lastName: 'User',
        email: 'test@test.com',
        password: 'password'
      });
      done();
    });
  });

  afterEach(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no users', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate user', function(done) {
    var userDup = new User(user);

    user.save(function() {
      userDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an email', function(done) {
    user.email = '';
    user.save(function(err) {
      should.exist(err.errors.email);
      done();
    });
  });

  it('should fail when saving without a first name', function(done) {
    user.firstName = '';
    user.save(function(err) {
      should.exist(err.errors.firstName);
      done();
    });
  });

  it('should fail when saving without a last name', function(done) {
    user.lastName = '';
    user.save(function(err) {
      should.exist(err.errors.lastName);
      done();
    });
  });

  it('should force verifiedEmail to be false when saving', function(done) {
    user.verifiedEmail = true;
    user.save(function(err) {
      user.verifiedEmail.should.not.be.true;
      done();
    });
  });

  it("should authenticate user if password is valid", function() {
    return user.authenticate('password').should.be.true;
  });

  it("should not authenticate user if password is invalid", function() {
    return user.authenticate('blah').should.not.be.true;
  });
});
