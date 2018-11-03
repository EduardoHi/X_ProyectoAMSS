const ErrorEnum = require("./enums/error");

const ErrorHandler = {
  accessErrorHandler(err) {
    console.error(err);
    if (
      err &&
      err.errors &&
      err.errors[0] &&
      err.errors[0].type === "unique violation"
    ) {
      return {
        display: `${err.errors[0].value} ya fué utilizado.`,
        name: "NOT_UNIQUE",
        ordinal: -1
      };
    }
    return ErrorEnum.GENERIC;
  }
};

module.exports = ErrorHandler;
