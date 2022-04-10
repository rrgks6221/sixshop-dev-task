'use strict';

module.exports = (status, msg, moreInfo) => {
  const response = {
    success: status < 400,
    msg,
    status,
  };

  for (const info in moreInfo) {
    if (Object.prototype.hasOwnProperty.call(moreInfo, info)) {
      response[info] = moreInfo[info];
    }
  }

  return response;
};
