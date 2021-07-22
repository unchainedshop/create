import {
  introspectSchema,
  makeRemoteExecutableSchema,
} from '@graphql-tools/wrap';
import fetch from 'isomorphic-unfetch';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink } from '@apollo/client';
import getConfig from 'next/config';

import { linkToExecutor } from '@graphql-tools/links';
import setLoginCookie from './setLoginCookie';

const {
  publicRuntimeConfig: { UNCHAINED_ENDPOINT },
} = getConfig();

console.log(`Connecting to Unchained API at: ${UNCHAINED_ENDPOINT}`); // eslint-disable-line

const httpLink = createUploadLink({
  uri: UNCHAINED_ENDPOINT,
  fetch,
  includeExtensions: true,
  credentials: 'same-origin',
});

const setCookieLink = setLoginCookie();

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

export const link = ApolloLink.from([
  errorFix,
  contextLink,
  setCookieLink,
  httpLink,
]);

export default async () => {
  try {
    const executor = linkToExecutor(link);
    const schema = makeRemoteExecutableSchema({
      schema: await introspectSchema(executor),
      executor,
    });
    return schema;
  } catch (e) {
    console.error(e); // eslint-disable-line
    return null;
  }
};
