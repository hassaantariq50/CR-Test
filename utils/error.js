/*
error.js - It contains error messages
 */

exports.errorName = {
  EMAIL_OR_PASSWORD_INCORRECT: "EMAIL_OR_PASSWORD_INCORRECT",
  SERVER_ERROR: "SERVER_ERROR",
  MISSING_FIELD_ERROR: "MISSING_FIELD_ERROR",
  EMAIL_FORMAT_ERROR: "EMAIL_FORMAT_ERROR",
  PASSWORD_FORMAT_ERROR: "PASSWORD_FORMAT_ERROR",
  INVALID_CREDENTIAL_ERROR: "INVALID_CREDENTIAL_ERROR",
  MONGO_ERROR: "MONGO_ERROR",
  EMAIL_EXIST_ERROR: "EMAIL_EXIST_ERROR",
  USER_ACCESS_AUTHORIZE_ERROR: "USER_ACCESS_AUTHORIZE_ERROR",
  FORMAT_FIELD_ERROR: "FORMAT_FIELD_ERROR",
  DATA_NOT_FOUND_ERROR: "DATA_NOT_FOUND_ERROR",
};

exports.errorType = {
  EMAIL_OR_PASSWORD_INCORRECT: {
    message: "Provided email or password is incorrect",
    statusCode: 400,
  },
  SERVER_ERROR: {
    message: "Server error",
    statusCode: 400,
  },
  MISSING_FIELD_ERROR: {
    message: "Fields are missing",
    statusCode: 400,
  },
  EMAIL_FORMAT_ERROR: {
    message: "Email format is not correct",
    statusCode: 400,
  },
  PASSWORD_FORMAT_ERROR: {
    message:
      "Password must contain minimum of * 1 letter (abc) * 1 numeric character (123) * 1 special character (!@#) * with a minimum of 8 characters",
    statusCode: 400,
  },
  INVALID_CREDENTIAL_ERROR: {
    message: "Incorrect email or password",
    statusCode: 400,
  },
  MONGO_ERROR: {
    message: "Internal server error",
    statusCode: 400,
  },
  EMAIL_EXIST_ERROR: {
    message: "Email already exist",
    statusCode: 400,
  },
  USER_ACCESS_AUTHORIZE_ERROR: {
    message: "You cannot access this functionality due to insufficient rights",
    statusCode: 401,
  },
  FORMAT_FIELD_ERROR: {
    message: "Field format is not correct",
    statusCode: 400,
  },
  DATA_NOT_FOUND_ERROR: {
    message: "Data not found",
    statusCode: 400,
  },
};
