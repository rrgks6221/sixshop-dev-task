'use strict';

const Customer = require('../../models/customer/customer');
const processCtrl = require('../../utils/processCtrl');

const process = {
  findOneFlagByName: async (req, res) => {
    const customer = new Customer(req);
    const response = await customer.findOneFlagByName();

    return processCtrl(res, response);
  },

  signUp: async (req, res) => {
    const customer = new Customer(req);
    const response = await customer.signUp();

    return processCtrl(res, response);
  },

  signIn: async (req, res) => {
    const customer = new Customer(req);
    const response = await customer.signIn();

    return processCtrl(res, response);
  },
};

module.exports = process;
