'use strict';

const express = require('express');
const ctrl = require('./root.ctrl');

const router = express.Router();

router.post('/sign-up', ctrl.signUp);

module.exports = router;
