import getConfig from 'next/config';

const {
  publicRuntimeConfig: { UNCHAINED_ENDPOINT },
} = getConfig();

export default (req, res) => {
  res.statusCode = 302;
  res.setHeader(
    'Location',
    `${UNCHAINED_ENDPOINT}/bity${req.url.replace('/api/bity', '')}`,
  );
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};
