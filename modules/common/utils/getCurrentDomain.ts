import getConfig from 'next/config';

const {
  publicRuntimeConfig: { FRONTEND_URL },
} = getConfig();

const getCurrentDomain = () => FRONTEND_URL;

export default getCurrentDomain;
