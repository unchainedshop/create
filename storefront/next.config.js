/* eslint-disable no-undef */

console.log(process.version);

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./node_env');

function extractDomain(string) {
  try {
    const url = new URL(string);
    return url.hostname;
  } catch (e) {
    return null;
  }
}

const {
  FRONTEND_URL,
  GRAPHQL_ENDPOINT,
  NODE_ENV,
  SKIP_INVALID_REMOTES,
  UNCHAINED_ENDPOINT,
  UNCHAINED_CREATE_THEME,
  DATATRANS_ENDPOINT,
  DATATRANS_MERCHANT,
} = process.env;

module.exports = {
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    FRONTEND_URL,
    GRAPHQL_ENDPOINT,
    NODE_ENV,
    SKIP_INVALID_REMOTES: JSON.parse(SKIP_INVALID_REMOTES || 'false'),
    UNCHAINED_ENDPOINT,
    DATATRANS_ENDPOINT,
    DATATRANS_MERCHANT,
    theme: JSON.parse(UNCHAINED_CREATE_THEME),
  },
  images: {
    domains: [
      'localhost',
      extractDomain(FRONTEND_URL),
      extractDomain(GRAPHQL_ENDPOINT),
      extractDomain(UNCHAINED_ENDPOINT),
    ].filter(Boolean),
    sizes: [320, 480, 820, 1200, 1600],
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'de',
  },
};
