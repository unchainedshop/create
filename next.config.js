/* eslint-disable no-undef */

console.log(process.version);

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./node_env');
const fs = require('fs');

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

const theme = JSON.parse(UNCHAINED_CREATE_THEME);

// localizations
const localizations = Object.fromEntries(
  Object.keys(theme.locales).map((locale) => {
    const text = fs.readFileSync(`.${theme.locales[locale]}`);
    return [locale, JSON.parse(text)];
  }),
);

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
    theme,
    localizations,
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
    locales: Object.keys(theme.locales),
    defaultLocale: Object.keys(theme.locales)[0],
  },
  async redirects() {
    return [
      {
        source: '/order:path*',
        destination: '/orders/[_id]',
        permanent: true,
      },
    ];
  },
};
