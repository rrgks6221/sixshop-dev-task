'use strict';

const express = require('express');
const ctrl = require('./store.ctrl');

const router = express.Router();

router.get('/:storeName/essential', ctrl.findOneFlagByName);

router.post('/:storeName/sign-up', ctrl.signUp);

module.exports = router;
