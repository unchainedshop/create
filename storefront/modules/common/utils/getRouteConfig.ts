import getConfig from 'next/config';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const ROUTES_CONFIG = theme.localizedRoutes;
export default ROUTES_CONFIG;
