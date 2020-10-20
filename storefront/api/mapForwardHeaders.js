import { lookup } from 'geoip-country';

const mapForwardHeaders = ({ headers = {}, ...request } = {}) => {
  const ip =
    headers['x-real-ip'] ||
    headers['x-forwarded-for'] ||
    request?.connection?.remoteAddress ||
    request?.socket?.remoteAddress ||
    request?.connection?.socket?.remoteAddress;

  console.log(headers);
  const forwardHeaders = {
    ...headers,
    'accept-language': headers['accept-language'],
    'x-real-ip': ip,
    'x-shop-country': headers['x-shop-country'] || lookup(ip),
  };
  // Delete forwardHeaders.origin;
  // delete forwardHeaders.host;
  // delete forwardHeaders.connection;
  // delete forwardHeaders.referer;

  return forwardHeaders;
};

export default mapForwardHeaders;
