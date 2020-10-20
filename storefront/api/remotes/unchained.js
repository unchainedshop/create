import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools';
import fetch from 'isomorphic-unfetch';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import getConfig from 'next/config';
import setLoginCookie from './setLoginCookie';

const {
  publicRuntimeConfig: { UNCHAINED_ENDPOINT, COOKIE_DOMAIN },
} = getConfig();

console.log(`Connecting to Unchained API at: ${UNCHAINED_ENDPOINT}`);

const httpLink = createUploadLink({
  uri: UNCHAINED_ENDPOINT,
  fetch,
  includeExtensions: true,
  credentials: 'same-origin',
});

const setCookieLink = setLoginCookie({
  cookieDomain: COOKIE_DOMAIN ? `Domain=${COOKIE_DOMAIN};` : '',
});

const errorFix = new ApolloLink((operation, forward) =>
  forward(operation).map((data) => {
    if (data.errors) {
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

export const link = ApolloLink.from([
  errorFix,
  contextLink,
  setCookieLink,
  httpLink,
]);

export default async () => {
  try {
    const schema = makeRemoteExecutableSchema({
      schema: await introspectSchema(link),
      link,
    });
    return schema;
  } catch (error) {
    console.error(error);
    return null;
  }
};
