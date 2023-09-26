const graphql = require("graphql");
const graphqlData = require("graphql-iso-date");
const userModel = require("../models/user");

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

const jwtToken = new GraphQLObjectType({
  name: "jwtToken",
  fields: () => ({
    jwtToken: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLDateTime,
    },
  }),
});

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    jwtToken: {
      type: jwtToken,
    },
    fullName: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLDateTime,
    },
  }),
});

module.exports = { jwtToken, userType };
