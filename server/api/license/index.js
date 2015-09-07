'use strict';

var express = require('express');
var controller = require('./license.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isOrganizationAdmin(), controller.index);
router.get('/:id', auth.isOrganizationAdmin(), controller.show);
router.get('/me', auth.isAuthenticated(), controller.me);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isOrganizationAdmin(), controller.update);
router.patch('/:id', auth.isOrganizationAdmin(), controller.update);
router.delete('/:id', auth.isOrganizationAdmin(), controller.destroy);

module.exports = router;