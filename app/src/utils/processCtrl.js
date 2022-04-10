'use strict';

module.exports = (res, response) => {
  if (response.isError) {
    return res.status(500).json(response.clientMsg);
  }
  return res.status(response.status).json(response);
};
