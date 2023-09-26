/**
 * This file is used to check email pattern
 */
const emailRegex = require("email-regex");
/**
 * isEmailPatternValid - Email pattern validator method
 * @param email - email that need to validate
 * @returns {boolean}
 */
exports.isEmailPatternValid = function (email) {
  return emailRegex({ exact: true }).test(email);
};

/**
 * This file is used to check password pattern
 */
const passwordValidator = require("password-validator");

/**
 * isPasswordPatternValid - Password pattern validator method
 * @param password - password that need to validate
 * @returns {boolean}
 */
exports.isPasswordPatternValid = function (password) {
  var passwords = new passwordValidator();
  passwords
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .digits(1)
    .has()
    .letters(1)
    .has()
    .symbols(1)
    .has()
    .not()
    .spaces();
  return passwords.validate(password);
};
