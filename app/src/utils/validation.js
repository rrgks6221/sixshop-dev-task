'use strict';

module.exports = (essential, body) => {
  const emptyKeys = essential.filter((value) => !body[value]);

  return { success: !emptyKeys.length, emptyKey: String(emptyKeys) };
};
