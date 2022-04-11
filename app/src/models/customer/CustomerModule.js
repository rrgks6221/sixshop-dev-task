'use strict';

class CustomerModule {
  static getEssential(flag) {
    const essential = Object.keys(flag).filter((key) => flag[key] === 1);

    essential.push('storeName', 'name', 'email', 'password');

    return essential;
  }

  static emailFormatCheck(email) {
    const EMAIL_REG_EXP =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return !EMAIL_REG_EXP.test(email);
  }
}

module.exports = CustomerModule;
