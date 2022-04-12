'use strict';

const express = require('express');
const loginCheck = require('../../middleWares/login-auth');
const ctrl = require('./store.ctrl');

const router = express.Router();

router.get('/:storeName/essential', ctrl.findOneFlagByName);
router.get('/:storeName/password', loginCheck, ctrl.findOnePasswordById);

router.post('/:storeName/sign-up', ctrl.signUp);
router.post('/:storeName/sign-in', ctrl.signIn);

router.put('/:storeName/privacy', loginCheck, ctrl.updatePrivacy);

router.patch('/:storeName/privacy/password', loginCheck, ctrl.updatePassword);

router.delete('/:storeName/resign', loginCheck, ctrl.resign);

module.exports = router;
