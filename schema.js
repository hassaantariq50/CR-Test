const graphql = require("graphql");
const rootQueryObject = require("./schema/query");
const mutationObject = require("./schema/mutation");

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: rootQueryObject,
  mutation: mutationObject,
});
