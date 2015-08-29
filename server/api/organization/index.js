'use strict';

var express = require('express');
var controller = require('./organization.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/subdomain/:id', controller.subdomain);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isOrganizationOwner(), controller.update);
router.patch('/:id', auth.isOrganizationOwner(), controller.update);
router.delete('/:id', auth.isOrganizationOwner(), controller.destroy);

module.exports = router;