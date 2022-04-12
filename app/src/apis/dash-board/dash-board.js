'use strict';

const Customer = require('../../models/customer/Customer');
const processCtrl = require('../../utils/processCtrl');

const process = {
  updateCustomerUseFlag: async (req, res) => {
    const customer = new Customer(req);
    const response = await customer.updateCustomerUseFlag();

    return processCtrl(res, response);
  },
};

module.exports = process;
