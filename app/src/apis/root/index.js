'use strict';

const express = require('express');
const ctrl = require('./root.ctrl');
const loginCheck = require('../../middleWares/login-auth');

const router = express.Router();

router.post('/sign-up', ctrl.signUp);
router.post('/sign-in', ctrl.signIn);

router.delete('/resign', loginCheck, ctrl.resign);

module.exports = router;
