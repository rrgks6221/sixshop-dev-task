'use strict';

const express = require('express');
const ctrl = require('./root.ctrl');

const router = express.Router();

router.post('/sign-up', ctrl.signUp);
router.post('/sign-in', ctrl.signIn);

module.exports = router;
