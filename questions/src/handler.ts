import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { ApolloServer } from 'apollo-server-lambda';
import { DateTimeMock } from 'graphql-scalars';
import { resolvers } from './resolvers';
import * as typeDefs from './schema.graphql'

const server = new ApolloServer({
  typeDefs: [DIRECTIVES, typeDefs],
  resolvers,
  mocks: {
    DateTime: DateTimeMock,
  }, // TODO: Remove in PROD.
  mockEntireSchema: false, // TODO: Remove in PROD.
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  })
});

exports.graphqlHandler = server.createHandler();
