'use strict';

const User = require('../../models/user/User');
const processCtrl = require('../../utils/processCtrl');

const process = {
  signUp: async (req, res) => {
    const user = new User(req);
    const response = await user.signUp();

    return processCtrl(res, response);
  },

  signIn: async (req, res) => {
    const user = new User(req);
    const response = await user.signIn();

    return processCtrl(res, response);
  },

  resign: async (req, res) => {
    const user = new User(req);
    const response = await user.resign();

    return processCtrl(res, response);
  },
};

module.exports = process;
