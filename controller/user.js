const UserModel = require("../models/user");
const jwtToken = require("jsonwebtoken");

const userController = {
  /**
   * findUserByEmail - finding a user by his email.
   * @param email - object that need to be insert
   * @returns {Promise<void>}
   */
  findUserByEmail: async (email) => {
    try {
      let user = await UserModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  },

  /**
   * insertUser - inserting user .
   * @param object - object that need to be insert
   * @returns {Promise<void>}
   */
  insertUser: async (object) => {
    try {
      let user = new UserModel(object);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  },

  /**
   * updateUserDevice - update device id against a user id.
   * @param userData - user data that need to update device id
   * @param deviceId - user device id
   * @returns {Promise<void>}
   */
  updateUserDevice: async (userData) => {
    try {
      let user = await UserModel.findOneAndUpdate(
        { _id: userData._id },
        {
          $push: {
            loggedDevices: {
              jwtToken: userData.jwtToken.jwtToken,
              deviceId: userData.deviceId,
            },
          },
        },
        { new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  },

  /**
   * issueToken - issueToken function will issue JWT token against a user id.
   * @param userData - user data that need to issue token
   * @returns {Promise<void>}
   */

  issueToken: async (userData) => {
    try {
      let tokenGenerated = jwtToken.sign(
        {
          id: userData._id,
          roleId: userData.userRole,
        },
        process.env.jwt_token,
        {
          expiresIn: "30d",
        }
      );
      let tokenObject = {
        jwtToken: tokenGenerated,
        createdAt: new Date(),
      };
      await UserModel.updateOne(
        { _id: userData._id },
        { $set: { jwtToken: tokenObject } },
        { new: true }
      );

      if (!userData.hasOwnProperty("jwtToken")) {
        userData.jwtToken = {};
      }
      userData.jwtToken = tokenObject;
      return userData;
    } catch (error) {
      throw error;
    }
  },

  /* verifyToken - This function will verify 2FA code against user Id.
   * @param token - token that need to verify.
   * @returns {Promise<void>}
   */

  verifyToken: async (jwtToken) => {
    try {
      let decoded = await jwtToken.verify(jwtToken, process.env.jwt_token);
      if (decoded) {
        let user = await UserModel.find(
          {
            loggedDevices: {
              $elemMatch: {
                jwtToken: jwtToken,
              },
            },
          },
          false,
          { lean: true }
        );
        if (user == null || user.length === 0) {
          throw "Not found";
        } else {
          return decoded;
        }
      }
    } catch (error) {
      throw error;
    }
  },

  /**
   * removeLoggedDeviceByDeviceId - logout the user
   * @param token - jwt token against which device will remove
   * @param userId - Id of user
   * @returns {Promise<void>}
   */
  removeLoggedDeviceByDeviceId: async (deviceId, userId) => {
    try {
      let findUser = UserModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { loggedDevices: { deviceId: deviceId } } },
        { safe: true, multi: true }
      );
      return findUser;
    } catch (error) {
      throw error;
    }
  },

  /**
   * getUserById - get user detail by userId.
   * @param userId - user that need to be check.
   * @returns {Promise<void>}
   */
  getUserById: async (userId) => {
    try {
      let user = await UserModel.findOne({ _id: userId });
      return user;
    } catch (error) {
      return error;
    }
  },

  /**
   * updateUserById - update user by his ID.
   * @param _id - _id that need to check
   * @returns {Promise<void>}
   */
  updateUserById: async (userData) => {
    try {
      let user = await UserModel.findOneAndUpdate(
        { _id: userData._id },
        { $set: userData },
        { new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = userController;
