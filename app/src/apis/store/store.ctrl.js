'use strict';

const Customer = require('../../models/customer/customer');
const processCtrl = require('../../utils/processCtrl');

const process = {
  signUp: async (req, res) => {
    const customer = new Customer(req);
    const response = await customer.signUp();

    return processCtrl(res, response);
  },
};

module.exports = process;
