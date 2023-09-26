const { errorType } = require('../utils/error');

const getErrorCode = errorName => {
  return errorType[errorName];
};

module.exports = getErrorCode;
