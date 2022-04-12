'use strict';

const express = require('express');
const loginCheck = require('../../middleWares/login-auth');
const ctrl = require('./dash-board');

const router = express.Router();

router.put('/:storeId', loginCheck, ctrl.updateCustomerUseFlag);

module.exports = router;
