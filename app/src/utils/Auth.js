'use strict';

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

class Auth {
  static async createJWT(userInfo) {
    const payload = {
      id: userInfo.id,
      storeName: userInfo.name,
    };

    return jwt.sign(payload, SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '1d',
      issuer: 'six shop',
    });
  }

  static async verifyJWT(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return err;
    }
  }
}

module.exports = Auth;
