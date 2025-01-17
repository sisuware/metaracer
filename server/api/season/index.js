'use strict';

var express = require('express');
var controller = require('./season.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isOrganizationAdmin(), controller.index);
router.get('/years', auth.isOrganizationAdmin(), controller.years);
router.get('/:id', auth.isOrganizationAdmin(), controller.show);
router.post('/', auth.isOrganizationAdmin(), controller.create);
router.put('/:id', auth.isOrganizationAdmin(), controller.update);
router.patch('/:id', auth.isOrganizationAdmin(), controller.update);
router.delete('/:id', auth.isOrganizationAdmin(), controller.destroy);

module.exports = router;