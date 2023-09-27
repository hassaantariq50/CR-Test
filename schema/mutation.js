const graphql = require("graphql");
const graphqlData = require("graphql-iso-date");
const { errorName } = require("../utils/error");
const saltRounds = 10;
const crypto = require("bcrypt");
require("dotenv").config();
const patternHelper = require("../helper/pattern");
//require Controllers here
const userController = require("../controller/user");
const { projectType } = require("../schema/types");
const verifyToken = require("../services/verifyToken");
const projectController = require("../controller/project");

//require types here
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

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //Mutation API's

    //This API is used to signup the user
    signupUser: {
      type: userType,
      args: {
        fullName: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        if (
          !args.hasOwnProperty("fullName") ||
          !args.hasOwnProperty("email") ||
          !args.hasOwnProperty("password")
        ) {
          throw new Error(errorName.MISSING_FIELD_ERROR);
        } else if (!patternHelper.isEmailPatternValid(args.email)) {
          throw new Error(errorName.EMAIL_FORMAT_ERROR);
        } else if (!patternHelper.isPasswordPatternValid(args.password)) {
          throw new Error(errorName.PASSWORD_FORMAT_ERROR);
        } else {
          return new Promise(async (resolve, reject) => {
            let findUser = await userController.findUserByEmail(
              args.email.toLowerCase()
            );
            if (findUser) {
              reject(new Error(errorName.EMAIL_EXIST_ERROR));
            } else {
              let password = crypto.hashSync(args.password, saltRounds);
              let createUserObj = {
                email: args.email.toLowerCase(),
                password: password,
                fullName: args.fullName,
              };

              let createUser = await userController.insertUser(createUserObj);
              // if (createUser) {
              // }
              resolve(createUser);
            }
          });
        }
      },
    },

    //This API is used to login the user
    loginUser: {
      type: userType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
        deviceId: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        if (
          !args.hasOwnProperty("email") ||
          !args.hasOwnProperty("password") ||
          !args.hasOwnProperty("deviceId")
        ) {
          throw new Error(errorName.MISSING_FIELD_ERROR);
        } else if (!patternHelper.isEmailPatternValid(args.email)) {
          throw new Error(errorName.EMAIL_FORMAT_ERROR);
        } else {
          return new Promise(async (resolve, reject) => {
            let findUser = await userController.findUserByEmail(
              args.email.toLowerCase()
            );
            if (!findUser) {
              reject(new Error(errorName.EMAIL_OR_PASSWORD_INCORRECT));
            } else {
              let match = await crypto.compare(
                args.password,
                findUser.password
              );
              if (!match || !findUser) {
                reject(new Error(errorName.EMAIL_OR_PASSWORD_INCORRECT));
              } else {
                let user = await userController.issueToken(findUser);
                user = {
                  ...user._doc,
                  deviceId: args.deviceId,
                };
                let response = await userController.updateUserDevice(user);
                let getUser = await userController.getUserById(response._id);
                resolve(getUser);
              }
            }
          });
        }
      },
    },

    //This API is to add a new project
    addProject: {
      type: projectType,
      args: {
        projectTitle: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        imageUrl: {
          type: GraphQLString,
        },
        techStack: {
          type: GraphQLList(GraphQLString),
        },
        githubLink: {
          type: GraphQLString,
        },
        liveLink: {
          type: GraphQLString,
        },
        createdAt: {
          type: GraphQLDateTime,
        },
      },
      resolve(parent, args, request) {
        return new Promise(async (resolve, reject) => {
          verifyToken(request).then(async (res) => {
            if (res.error) {
              reject(new Error(errorName.USER_ACCESS_AUTHORIZE_ERROR));
            } else {
              let createProjectObj = {
                userId: res.data._id,
                projectTitle: args.projectTitle,
                description: args.description,
                imageUrl: args.imageUrl,
                techStack: args.techStack,
                githubLink: args.githubLink,
                liveLink: args.liveLink,
                status: 1,
              };

              let createProject = await projectController.insertProject(
                createProjectObj
              );

              resolve(createProject);
            }
          });
        });
      },
    },

    //This API is to add a new project
    updateProject: {
      type: projectType,
      args: {
        projectId: {
          type: GraphQLString,
        },
        projectTitle: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        imageUrl: {
          type: GraphQLString,
        },
        techStack: {
          type: GraphQLList(GraphQLString),
        },
        githubLink: {
          type: GraphQLString,
        },
        liveLink: {
          type: GraphQLString,
        },
        status: {
          type: GraphQLFloat,
        },
        createdAt: {
          type: GraphQLDateTime,
        },
      },
      resolve(parent, args, request) {
        return new Promise(async (resolve, reject) => {
          verifyToken(request).then(async (res) => {
            if (res.error) {
              reject(new Error(errorName.USER_ACCESS_AUTHORIZE_ERROR));
            } else {
              let updateProjectObj = {
                _id: args.projectId,
                projectTitle: args.projectTitle,
                description: args.description,
                imageUrl: args.imageUrl,
                techStack: args.techStack,
                githubLink: args.githubLink,
                liveLink: args.liveLink,
                status: args.status ? args.status : 1,
              };
              let createProject = await projectController.updateProjectById(
                updateProjectObj
              );

              resolve(createProject);
            }
          });
        });
      },
    },

    //This API is used to logout the user
    logoutUser: {
      type: userType,
      args: {
        deviceId: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args, request) {
        return new Promise((resolve, reject) => {
          verifyToken(request).then(async (res) => {
            if (res.error) {
              reject(new Error(errorName.USER_ACCESS_AUTHORIZE_ERROR));
            } else {
              await userController.removeLoggedDeviceByDeviceId(
                args.deviceId,
                res.data._id
              );
              resolve(errorName.LOGOUT_SUCCESSFUL);
            }
          });
        });
      },
    },
  },
});

module.exports = Mutation;
