const graphql = require("graphql");
const graphqlData = require("graphql-iso-date");
const { errorName } = require("../utils/error");
//Require Models here
const userModel = require("../models/user");
//Require Controllers here
const userController = require("../controller/user");
const verifyToken = require("../services/verifyToken");
const projectController = require("../controller/project");
const { projectType } = require("../schema/types");
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

    //This API is used to get all my projects
    getAllProjects: {
      type: new GraphQLList(projectType),
      args: {
        status: {
          type: GraphQLFloat,
        },
      },
      resolve(parent, args, request) {
        return new Promise((resolve, reject) => {
          verifyToken(request).then(async (res) => {
            if (res.error) {
              reject(new Error(errorName.USER_ACCESS_AUTHORIZE_ERROR));
            } else {
              if (args.status == 1) {
                let getMyProjects = await projectController.getProjectByUserId(
                  res.data._id
                );
                resolve(getMyProjects);
              } else {
                let getMyProjects = await projectController.getProjectByStatus(
                  res.data._id,
                  args.status
                );
                resolve(getMyProjects);
              }
            }
          });
        });
      },
    },
  },
});

module.exports = RootQuery;
