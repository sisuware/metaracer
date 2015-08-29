'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/organizations', function() {

  it('if unauthenticated, should respond with 401', function(done) {
    request(app)
      .get('/api/organizations')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

// describe('GET /api/organizations/subdomain', function() {

//   it('it should find the organization with the subdomain', function(done) {
//     request(app)
//       .get('/api/organizations/subdomain')
//       .expect(401)
//       .end(function(err, res) {
//         if (err) return done(err);
//         done();
//       });
//   });
// });