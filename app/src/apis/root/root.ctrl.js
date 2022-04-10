'use strict';

const User = require('../../models/user/User');

const process = {
  signUp: async (req, res) => {
    const user = new User(req);
    const response = await user.signUp();

    if (response.isError) {
      return res.status(500).json(response.clientMsg);
    }
    if (response.success) {
      return res.status(201).json(response);
    }
    return res.status(400).json(response);
  },
};

module.exports = process;
