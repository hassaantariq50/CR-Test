const jwt = require("jsonwebtoken");
const userController = require("../controller/user");
const { errorName } = require("../utils/error");

module.exports = async function (req, res, next) {
  if (!req.headers.authorization) {
    return { error: "Not Authorized", data: null };
  }
  let token = req.headers.authorization;
  if (!token) {
    return { error: "Not Authorized", data: null };
  }
  try {
    let verified = jwt.verify(token, process.env.jwt_token);
    req.user = verified;
    let currentUser = await userController.getUserById(verified.id);

    let check = 0;

    currentUser.loggedDevices.forEach((x) => {
      if (x.jwtToken == token) {
        check = 1;
      }
    });
    if (check == 0) {
      return { error: "Not Authorized", data: null };
    } else {
      return { error: null, data: currentUser };
    }
  } catch (error) {
    return { error: error, data: null };
  }
};
