import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';

import possibleTypes from '../../../possibleTypes.json';

const {
  publicRuntimeConfig: { GRAPHQL_ENDPOINT },
} = getConfig();

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, ctx) {
  const remoteAddress = ctx?.req?.connection?.remoteAddress;
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
    headers: remoteAddress ? { 'x-real-ip': remoteAddress } : undefined,
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    link: httpLink,
    cache: new InMemoryCache({ possibleTypes }).restore(initialState || {}),
  });
}

export default function initApollo({ initialState, ctx }) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    apolloClient = create(initialState, ctx);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, ctx);
  }

  return apolloClient;
}
