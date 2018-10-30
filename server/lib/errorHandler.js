const ErrorEnum = require("./enums/error");

const ErrorHandler = {
  accessErrorHandler(err) {
    console.error(err);
    return ErrorEnum.GENERIC;
  }
};

module.exports = ErrorHandler;
