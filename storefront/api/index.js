import { ApolloServer } from 'apollo-server-micro';
import responseCachePlugin from 'apollo-server-plugin-response-cache';

import mapForwardHeaders from './mapForwardHeaders';
import { unchainedSchema } from './remotes';

const createApolloServer = async () =>
  new ApolloServer({
    schema: await unchainedSchema,
    introspection: true,
    cors: false,
    cacheControl: true,
    tracing: false,
    context: (graphqlContext) => ({
      ...graphqlContext,
      forwardHeaders: mapForwardHeaders(graphqlContext.req),
    }),
    playground: {
      settings: {
        'request.credentials': 'same-origin',
      },
    },
    plugins: [
      responseCachePlugin({
        extraCacheKeyData: ({ context }) => context?.locale?.normalized || '',
        shouldReadFromCache: ({ req }) => {
          const bustCache = req?.query?.bustCache;
          return !bustCache;
        },
        shouldWriteToCache: ({ req }) => {
          const bustCache = req?.query?.bustCache;
          return !bustCache;
        },
      }),
    ],
  });

const apolloServerPromise = createApolloServer();

export default async (...args) => {
  const apolloServer = await apolloServerPromise;
  return apolloServer.createHandler({ path: '/api/graphql' })(...args);
};
