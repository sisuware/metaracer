'use strict';

var express = require('express');
var controller = require('./form.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', auth.isOrganizationAdmin(), controller.show);
router.post('/', auth.isOrganizationAdmin(), controller.create);
router.put('/:id', auth.isOrganizationAdmin(), controller.update);
router.patch('/:id', auth.isOrganizationAdmin(), controller.update);
router.delete('/:id', auth.isOrganizationAdmin(), controller.destroy);

module.exports = router;