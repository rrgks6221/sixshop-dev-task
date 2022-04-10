'use strict';

class Error {
  static ctrl(err, msg = '서버 에러입니다. 서버 개발자에게 문의해 주세요.') {
    return {
      isError: true,
      errMsg: err,
      clientMsg: msg,
    };
  }
}

module.exports = Error;
