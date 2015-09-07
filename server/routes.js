/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/motorcycles', require('./api/motorcycle'));
  app.use('/api/races', require('./api/race'));
  app.use('/api/numbers', require('./api/number'));
  app.use('/api/licenses', require('./api/license'));
  app.use('/api/transponders', require('./api/transponder'));
  app.use('/api/seasons', require('./api/season'));
  app.use('/api/members', require('./api/member'));
  app.use('/api/organizations', require('./api/organization'));
  app.use('/api/forms', require('./api/form'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
