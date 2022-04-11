'use strict';

const express = require('express');
const loginCheck = require('../../middleWares/login-auth');
const ctrl = require('./store.ctrl');

const router = express.Router();

router.get('/:storeName/essential', ctrl.findOneFlagByName);

router.post('/:storeName/sign-up', ctrl.signUp);
router.post('/:storeName/sign-in', ctrl.signIn);

router.delete('/:storeName/resign', loginCheck, ctrl.resign);

module.exports = router;
