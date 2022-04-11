'use strict';

const v4 = require('uuid4');

module.exports = () => {
  const tokens = v4().split('-');
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};
