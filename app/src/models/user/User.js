'use strict';

const UserModule = require('./UserModule');
const UserStorage = require('./UserStorage');
const Error = require('../../utils/Error');
const Auth = require('../../utils/Auth');
const validation = require('../../utils/validation');
const makeResponse = require('../../utils/makeResponse');

class User {
  constructor(req) {
    this.body = req.body;
    this.auth = req.auth;
  }

  async signUp() {
    const { id, email, storeName } = this.body;

    const isValidation = validation(Object.keys(this.body), this.body);

    if (!isValidation.success) {
      return makeResponse(
        400,
        `${isValidation.emptyKey}은(는) 필수로 입력해야 합니다.`
      );
    }

    const emailCheck = UserModule.emailFormatCheck(email);

    if (emailCheck) {
      return makeResponse(400, '이메일 형식이 맞지 않습니다.');
    }

    try {
      const existId = await UserStorage.findOneById(id);

      if (existId) {
        return makeResponse(
          409,
          '해당 아이디를 다른 사용자가 사용하고 있습니다.'
        );
      }

      const existEmail = await UserStorage.findOneByEmail(email);

      if (existEmail) {
        return makeResponse(
          409,
          '해당 이메일을 다른 사용자가 사용하고 있습니다.'
        );
      }

      const existStoreName = await UserStorage.findOneByStoreName(storeName);

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

  async signIn() {
    const { id, password } = this.body;

    try {
      const userInfo = await UserStorage.findOneById(id);

      if (!userInfo) {
        return makeResponse(
          400,
          '존재하지 않는 아이디이거나 비밀번호가 일치하지 않습니다.'
        );
      }

      const isSame = UserModule.comparePassword(password, userInfo.password);

      if (!isSame) {
        return makeResponse(
          400,
          '존재하지 않는 아이디이거나 비밀번호가 일치하지 않습니다.'
        );
      }

      const jwt = await Auth.createJWT(userInfo);

      return makeResponse(200, 'sdkfns', { jwt });
    } catch (err) {
      return Error.ctrl(err);
    }
  }

  async resign() {
    try {
      const isDelete = await UserStorage.deleteOneById(this.auth.id);

      if (isDelete) return makeResponse(200, '회원 탈퇴 되었습니다.');
      return makeResponse(400, '회원 탈퇴에 실패하였습니다.');
    } catch (err) {
      return Error.ctrl(err);
    }
  }
}

module.exports = User;
