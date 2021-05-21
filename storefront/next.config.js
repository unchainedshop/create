/* eslint-disable no-undef */

console.log(process.version);

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./node_env');

const {
  FRONTEND_URL,
  GRAPHQL_ENDPOINT,
  NODE_ENV,
  SKIP_INVALID_REMOTES,
  UNCHAINED_ENDPOINT,
  UNCHAINED_CREATE_THEME,
} = process.env;

module.exports = {
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    FRONTEND_URL,
    GRAPHQL_ENDPOINT,
    NODE_ENV,
    SKIP_INVALID_REMOTES: JSON.parse(SKIP_INVALID_REMOTES || 'false'),
    UNCHAINED_ENDPOINT,
    theme: JSON.parse(UNCHAINED_CREATE_THEME),
  },
  images: {
    domains: ['localhost',"dynoptic-template.unchained.wtf"],
    sizes: [320, 480, 820, 1200, 1600],
  },
};
