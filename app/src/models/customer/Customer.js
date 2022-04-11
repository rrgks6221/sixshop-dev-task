'use strict';

const Error = require('../../utils/Error');
const makeResponse = require('../../utils/makeResponse');
const CustomerStorage = require('./CustomerStorage');

class Customer {
  constructor(req) {
    this.params = req.params;
  }

  async findOneFlagByName() {
    try {
      const flag = await CustomerStorage.findOneFlagByName(
        this.params.storeName
      );

      if (!flag) {
        return makeResponse(404, '해당 상점이 존재하지 않습니다.');
      }
      return makeResponse(200, 'sdfgjn', { flag });
    } catch (err) {
      return Error.ctrl(err);
    }
  }
}

module.exports = Customer;
