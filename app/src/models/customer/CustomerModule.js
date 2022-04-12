'use strict';

class CustomerModule {
  static getEssential(flag, add = ['storeName', 'name', 'email', 'password']) {
    const essential = Object.keys(flag).filter((key) => flag[key] === 1);

    essential.push(...add);

    return essential;
  }

  static emailFormatCheck(email) {
    const EMAIL_REG_EXP =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return !EMAIL_REG_EXP.test(email);
  }

  static comparePassword(inputPassword, storedPassword) {
    return inputPassword === storedPassword;
  }
}

module.exports = CustomerModule;
