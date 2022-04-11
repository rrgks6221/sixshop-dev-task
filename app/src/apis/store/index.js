'use strict';

const express = require('express');
const ctrl = require('./store.ctrl');

const router = express.Router();

router.get('/:storeName/essential', ctrl.findOneFlagByName);

router.post('/:storeName/sign-up', ctrl.signUp);
router.post('/:storeName/sign-in', ctrl.signIn);

module.exports = router;
