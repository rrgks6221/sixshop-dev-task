'use strict';

const Error = require('../../utils/Error');
const getUuid = require('../../utils/getUuid');
const makeResponse = require('../../utils/makeResponse');
const validation = require('../../utils/validation');
const CustomerModule = require('./CustomerModule');
const CustomerStorage = require('./CustomerStorage');

class Customer {
  constructor(req) {
    this.body = req.body;
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
      return makeResponse(200, '회원 필수 값 조회 성공', { flag });
    } catch (err) {
      return Error.ctrl(err);
    }
  }

  async signUp() {
    try {
      const flag = await CustomerStorage.findOneFlagByName(
        this.params.storeName
      );

      if (!flag) {
        return makeResponse(404, '해당 상점이 존재하지 않습니다.');
      }

      const essential = CustomerModule.getEssential(flag);

      const isValidation = validation(essential, this.body);

      if (isValidation.success) {
        return makeResponse(
          400,
          `${isValidation.emptyKey}은(는) 필수로 입력해야 합니다.`
        );
      }

      const signedCustomer = await CustomerStorage.findOneCustomerByEmail(
        this.body.email
      );

      if (signedCustomer) {
        return makeResponse(409, '해당 이메일은 다른 사용자가 사용 중 입니다.');
      }

      const uuid = getUuid();

      const isCustomerCreate = await CustomerStorage.createCustomer(
        uuid,
        this.body
      );

      if (!isCustomerCreate) {
        return makeResponse(400, '회원가입에 실패했습니다.');
      }

      const isCreatecustomModel = await CustomerStorage.createCustomModel(
        uuid,
        this.body
      );

      if (!isCreatecustomModel) {
        return makeResponse(400, '회원가입에 실패했습니다.');
      }
      return makeResponse(200, '회원가입에 성공했습니다.');
    } catch (err) {
      return Error.ctrl(err);
    }
  }
}

module.exports = Customer;
