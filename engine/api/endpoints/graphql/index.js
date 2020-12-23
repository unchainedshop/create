import { startPlatform } from 'meteor/unchained:platform';

import typeDefs from './schema';
import resolvers from './resolvers';
import rolesOptions from './roles-options';
import resolveUserForAccessKey from '../../../lib/auth/resolveUserForAccessKey';

export default (options = {}) => {
  startPlatform({
    introspection: true,
    cacheControl: false,
    corsOrigins: true,
    playground: true,
    typeDefs: [...typeDefs],
    resolvers: [resolvers],
    context: (req) => {
      const remoteAddress =
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      if (req.headers.authorization) {
        const [type, token] = req.headers.authorization.split(' ');
        if (type === 'Bearer' && token) {
          const user = resolveUserForAccessKey(token);
          if (user) {
            return { remoteAddress, userId: user._id, user };
          }
        }
      }
      return { remoteAddress };
    },
    rolesOptions,
    ...options,
  });
};
