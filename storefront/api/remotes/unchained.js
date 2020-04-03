import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools';
import fetch from 'isomorphic-unfetch';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { UNCHAINED_ENDPOINT },
} = getConfig();

console.log(`Connecting to Unchained API at: ${UNCHAINED_ENDPOINT}`); // eslint-disable-line

const httpLink = createUploadLink({
  uri: UNCHAINED_ENDPOINT,
  fetch,
  includeExtensions: true,
});
const errorFix = new ApolloLink((operation, forward) =>
  forward(operation).map((data) => {
    if (data.errors) {
      // eslint-disable-next-line
      for (const error of data.errors) {
        if (!(error instanceof Error))
          Object.setPrototypeOf(error, Error.prototype);
      }
    }

    return data;
  }),
);

const contextLink = setContext((request, previousContext) => {
  const { graphqlContext: { forwardHeaders } = {} } = previousContext;
  return {
    headers: forwardHeaders || {},
  };
});

export const link = ApolloLink.from([errorFix, contextLink, httpLink]);

export default async () => {
  try {
    const schema = makeRemoteExecutableSchema({
      schema: await introspectSchema(link),
      link,
    });
    return schema;
  } catch (e) {
    console.error(e); // eslint-disable-line
    return null;
  }
};
