const graphql = require("graphql");
const graphqlData = require("graphql-iso-date");
const { errorName } = require("../utils/error");
//Require Models here
const userModel = require("../models/user");
//Require Controllers here
const userController = require("../controller/user");
//Require Types here
const userType = require("../schema/types").userType;

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const { GraphQLDate, GraphQLTime, GraphQLDateTime } = graphqlData;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //Query API's
    user: {
      type: userType,
      args: {
        _id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return userModel.findById(args._id);
      },
    },

    //This API is used to get user's own profile
    getUserProfile: {
      type: userType,
      resolve(parent, args, request) {
        return new Promise((resolve, reject) => {
          if (request.headers.hasOwnProperty("authorization")) {
            userController
              .verifyToken(request.headers["authorization"])
              .then(function (decoded) {
                let currentUser = {};
                currentUser.currentRoleId = decoded.roleId;
                currentUser.currentEmail = decoded.email;
                currentUser.currentEmailId = decoded.email;
                currentUser.currentId = decoded.id;
                userController
                  .existingUserById(currentUser.currentId)
                  .then(function (response) {
                    if (response != null && response.length > 0) {
                      delete response[0].password;
                      resolve(response[0]);
                    } else {
                      throw new Error(errorName.USER_NOT_FOUND_ERROR);
                    }
                  })
                  .catch(function (err) {
                    reject(err);
                  });
              })
              .catch(function (err) {
                reject(new Error(errorName.USER_ACCESS_AUTHORIZE_ERROR));
              });
          } else {
            throw new Error(errorName.USER_ACCESS_AUTHORIZE_ERROR);
          }
        });
      },
    },

    users: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        return userModel.find({});
      },
    },
  },
});

module.exports = RootQuery;
