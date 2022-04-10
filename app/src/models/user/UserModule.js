'use strict';

class UserModule {
  static emailFormatCheck(email) {
    const EMAIL_REG_EXP =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return !EMAIL_REG_EXP.test(email);
  }

  static comparePassword(inputPassword, storedPassword) {
    return inputPassword === storedPassword;
  }
}

module.exports = UserModule;
