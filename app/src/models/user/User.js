'use strict';

const UserModule = require('./UserModule');
const UserStorage = require('./UserStorage');
const Error = require('../../utils/Error');
const validation = require('../../utils/validation');
const makeResponse = require('../../utils/makeResponse');

class User {
  constructor(req) {
    this.body = req.body;
  }

  async signUp() {
    const isValidation = validation(Object.keys(this.body), this.body);

    if (!isValidation.success) {
      return makeResponse(
        400,
        `${isValidation.emptyKey}은(는) 필수로 입력해야 합니다.`
      );
    }

    const emailCheck = UserModule.emailFormatCheck(this.body.email);

    if (emailCheck) {
      return makeResponse(400, '이메일 형식이 맞지 않습니다.');
    }

    try {
      const existId = await UserStorage.findOneById(this.body.id);

      if (existId) {
        return makeResponse(
          409,
          '해당 아이디를 다른 사용자가 사용하고 있습니다.'
        );
      }

      const existEmail = await UserStorage.findOneByEmail(this.body.email);

      if (existEmail) {
        return makeResponse(
          409,
          '해당 이메일을 다른 사용자가 사용하고 있습니다.'
        );
      }

      const existStoreName = await UserStorage.findOneByStoreName(
        this.body.storeName
      );

      if (existStoreName) {
        return makeResponse(
          409,
          '해당 상점명을 다른 사용자가 사용하고 있습니다.'
        );
      }

      const isCreate = await UserStorage.createUser(this.body);

      if (isCreate) return makeResponse(201, '회원가입이 되었습니다.');
      return makeResponse(400, '회원가입에 실패하였습니다.');
    } catch (err) {
      return Error.ctrl(err);
    }
  }
}

module.exports = User;
