'use strict';

const User = require('../../models/user/User');
const processCtrl = require('../../utils/processCtrl');

const process = {
  signUp: async (req, res) => {
    const user = new User(req);
    const response = await user.signUp();

    return processCtrl(res, response);
  },
};

module.exports = process;
