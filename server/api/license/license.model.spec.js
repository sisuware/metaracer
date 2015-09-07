'use strict';

var should = require('should');
var app = require('../../app');
var License = require('./license.model');

var license;

describe('License Model', function() {
  // Yes this is slower, but ensures proper test environments
  beforeEach(function(done) {
    License.remove().exec().then(function() {
      // assign a fresh model, but should not save.
      license = new License({
        created: Date.now(),
        expires: Date.now()
      });
      done();
    });
  });

  after(function(done) {
    License.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no licenses', function(done) {
    License.find({}, function(err, licenses) {
      licenses.should.have.length(0);
      done();
    });
  });

  it('should fail when saving without a created date', function(done) {
    license.created = '';
    license.save(function(err) {
      should.exist(err.errors.created);
      done();
    });
  });

  it('should fail when saving without a expires date', function(done) {
    license.expires = '';
    license.save(function(err) {
      should.exist(err.errors.expires);
      done();
    });
  });

  it('should fail when saving without a _member', function(done) {
    license._member = null;
    license.save(function(err) {
      should.exist(err.errors._member);
      done();
    });
  });

  it('should fail when saving without a _number', function(done) {
    license._number = null;
    license.save(function(err) {
      should.exist(err.errors._number);
      done();
    });
  });

  it('should fail when saving without a _season', function(done) {
    license._season = null;
    license.save(function(err) {
      should.exist(err.errors._season);
      done();
    });
  });
});
