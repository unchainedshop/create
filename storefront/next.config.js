
console.log(process.version);

require('dotenv-extended').load({
  silent: process.env.SUPPRESS_ENV_ERRORS,
  errorOnMissing: !process.env.SUPPRESS_ENV_ERRORS,
  errorOnRegex: !process.env.SUPPRESS_ENV_ERRORS,
  errorOnExtra: !process.env.SUPPRESS_ENV_ERRORS,
  includeProcessEnv: true
});

const {
  FRONTEND_URL,
  GETCOCKPIT_ENDPOINT,
  GETCOCKPIT_TOKEN,
  GRAPHQL_ENDPOINT,
  NODE_ENV,
  SKIP_INVALID_REMOTES,
  UNCHAINED_ENDPOINT
} = process.env;

module.exports = {
  serverRuntimeConfig: {
    GETCOCKPIT_TOKEN
  },
  publicRuntimeConfig: {
    FRONTEND_URL,
    GETCOCKPIT_ENDPOINT,
    GRAPHQL_ENDPOINT,
    NODE_ENV,
    SKIP_INVALID_REMOTES: JSON.parse(SKIP_INVALID_REMOTES || 'false'),
    UNCHAINED_ENDPOINT
  }
};
