import { lookup } from 'geoip-country';

const mapForwardHeaders = ({ headers = {}, ...req } = {}) => {
  const ip =
    headers['x-real-ip'] ||
    headers['x-forwarded-for'] ||
    req?.connection?.remoteAddress ||
    req?.socket?.remoteAddress ||
    req?.connection?.socket?.remoteAddress;

  const forwardHeaders = {
    'accept-language': headers['accept-language'],
    'x-real-ip': ip,
    'x-shop-country': headers['x-shop-country'] || lookup(ip),
  };
  return forwardHeaders;
};

export default mapForwardHeaders;
