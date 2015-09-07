'use strict';

var express = require('express');
var controller = require('./organization.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/subdomain/:id', controller.subdomain);
router.get('/:id', auth.isOrganizationAdmin(), controller.show);
router.post('/', auth.isOrganizationAdmin(), controller.create);
router.put('/:id', auth.isOrganizationAdmin(), controller.update);
router.patch('/:id', auth.isOrganizationAdmin(), controller.update);
router.delete('/:id', auth.isOrganizationOwner(), controller.destroy);

module.exports = router;