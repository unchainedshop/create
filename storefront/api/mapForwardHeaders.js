import { lookup } from 'geoip-country';

const mapForwardHeaders = ({ headers = {}, ...req } = {}) => {
  const ip =
    headers['x-real-ip'] ||
    headers['x-forwarded-for'] ||
    req?.connection?.remoteAddress ||
    req?.socket?.remoteAddress ||
    req?.connection?.socket?.remoteAddress;

  const forwardHeaders = {
    ...headers,
    'accept-language': headers['accept-language'],
    'x-real-ip': ip,
    'x-shop-country': headers['x-shop-country'] || lookup(ip),
    'user-agent': headers['user-agent'],
  };

  delete forwardHeaders['sec-fetch-site'];
  delete forwardHeaders['sec-fetch-mode'];
  delete forwardHeaders['sec-fetch-dest'];
  delete forwardHeaders.host;
  delete forwardHeaders.origin;
  delete forwardHeaders.referer;
  delete forwardHeaders['content-length'];
  return forwardHeaders;
};

export default mapForwardHeaders;
