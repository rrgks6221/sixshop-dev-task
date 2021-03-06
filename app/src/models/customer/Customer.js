'use strict';

const Auth = require('../../utils/Auth');
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
    this.auth = req.auth;
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

  async findOnePasswordById() {
    try {
      const password = await CustomerStorage.findOnePasswordById(this.auth.id);

      return makeResponse(200, '비밀번호 찾기 성공', { password });
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

      const essential = CustomerModule.getEssential(flag, [
        'name',
        'email',
        'password',
      ]);

      const isValidation = validation(essential, this.body);

      if (!isValidation.success) {
        return makeResponse(
          400,
          `${isValidation.emptyKey}은(는) 필수로 입력해야 합니다.`
        );
      }

      const emailCheck = CustomerModule.emailFormatCheck(this.body.email);

      if (emailCheck) {
        return makeResponse(400, '이메일 형식이 맞지 않습니다.');
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
      return makeResponse(201, '회원가입에 성공했습니다.');
    } catch (err) {
      console.log(err);
      return Error.ctrl(err);
    }
  }

  async signIn() {
    const isValidation = validation(['id', 'password'], this.body);

    if (!isValidation.success) {
      return makeResponse(400, `${isValidation.emptyKey}를 입력해주세요`);
    }

    try {
      const customer = await CustomerStorage.findOneSignedCustomer(
        this.body.id
      );

      if (!customer) {
        return makeResponse(400, '존재하지 않는 회원입니다.');
      }

      const isCompare = CustomerModule.comparePassword(
        this.body.password,
        customer.password
      );

      if (!isCompare) {
        return makeResponse(400, '비밀번호가 틀렸습니다.');
      }

      const jwt = await Auth.createJWT(customer);

      return makeResponse(200, '로그인 되었습니다.', { jwt });
    } catch (err) {
      return Error.ctrl(err);
    }
  }

  async resign() {
    try {
      const isDelete = await CustomerStorage.deleteOneById(this.auth.id);

      if (isDelete) return makeResponse(200, '회원 탈퇴 되었습니다.');
      return makeResponse(400, '회원 탈퇴에 실패하였습니다.');
    } catch (err) {
      return Error.ctrl(err);
    }
  }

  async updateCustomerUseFlag() {
    const isValidation = validation(
      [
        'loginId',
        'phoneNumber',
        'address',
        'birthDate',
        'gender',
        'recommender',
        'reserve',
        'purchaseCount',
        'purchaseAmount',
      ],
      this.body
    );

    if (!isValidation.success) {
      return makeResponse(400, `${isValidation.emptyKey}를 입력해주세요`);
    }

    try {
      const isUpdate = await CustomerStorage.updateCustomerUseFlag(
        this.auth.id,
        this.body
      );

      if (isUpdate) {
        return makeResponse(200, '사용자 정의 필드 수정 성공');
      }
      return makeResponse(400, '사용자 정의 필드 수정 실패');
    } catch (err) {
      return Error.ctrl(err);
    }
  }

  async updatePassword() {
    try {
      const isUpdate = await CustomerStorage.updatePassword(
        this.auth.id,
        this.body.password
      );

      if (isUpdate) return makeResponse(200, '비밀번호가 변경되었습니다.');
      return makeResponse(400, '비밀번호 변경에 실패했습니다.');
    } catch (err) {
      Error.ctrl(err);
    }
  }

  async updatePrivacy() {
    try {
      const flag = await CustomerStorage.findOneFlagByName(
        this.params.storeName
      );

      if (!flag) {
        return makeResponse(404, '해당 상점이 존재하지 않습니다.');
      }

      const essential = CustomerModule.getEssential(flag, ['name', 'email']);

      const isValidation = validation(essential, this.body);

      if (!isValidation.success) {
        return makeResponse(
          400,
          `${isValidation.emptyKey}은(는) 필수로 입력해야 합니다.`
        );
      }

      const emailCheck = CustomerModule.emailFormatCheck(this.body.email);

      if (emailCheck) {
        return makeResponse(400, '이메일 형식이 맞지 않습니다.');
      }

      const signedCustomer = await CustomerStorage.findOneCustomerByEmail(
        this.body.email,
        this.auth.id
      );

      if (signedCustomer) {
        return makeResponse(409, '해당 이메일은 다른 사용자가 사용 중 입니다.');
      }

      const isBasicUpdate = await CustomerStorage.updateCustomerBasic(
        this.auth.id,
        this.body
      );

      if (!isBasicUpdate) {
        return makeResponse(400, '개인정보 수정에 실패했습니다.');
      }

      const isCustomUpdate = await CustomerStorage.updateCustomerCustom(
        this.auth.id,
        this.body
      );

      if (!isCustomUpdate) {
        return makeResponse(400, '개인정보 수정에 실패했습니다.');
      }
      return makeResponse(200, '개인정보가 수정되었습니다.');
    } catch (err) {
      return Error.ctrl(err);
    }
  }
}

module.exports = Customer;
