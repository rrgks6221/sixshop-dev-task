'use strict';

const Auth = require('../utils/Auth');

const loginCheck = async (req, res, next) => {
  const token = req.headers['authorization'] || '';

  if (token.length === 0) {
    return res.status(401).json({
      success: false,
      msg: 'JWT 토큰이 존재하지 않습니다. 로그인 후 이용해주세요.',
    });
  }

  const auth = await Auth.verifyJWT(token.slice(7));

  if (auth.err === 'jwt expired') {
    return res.status(401).json({
      suceess: false,
      msg: '유효 시간이 만료된 토큰입니다. 다시 로그인 후 이용해주세요.',
    });
  }
  if (auth.err === 'invalid token') {
    return res
      .status(401)
      .json({ success: false, msg: '유효하지 않는 토큰입니다.' });
  }
  if (auth.id === undefined) {
    return res
      .status(401)
      .json({ success: false, msg: '유효하지 않는 토큰입니다.' });
  }

  req.auth = auth;

  return next();
};

module.exports = loginCheck;
