import { startPlatform } from 'meteor/unchained:platform';

import typeDefs from './schema';
import resolvers from './resolvers';
import rolesOptions from './roles-options';
import resolveUserForAccessKey from '../../../lib/auth/resolveUserForAccessKey';

const context = async ({ req, unchainedContextFn }) => {
  const unchainedContext = await unchainedContextFn({ req });

  if (req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(' ');
    if (type === 'Bearer' && token) {
      const user = resolveUserForAccessKey(token);
      if (user) {
        return { ...unchainedContext, userId: user._id, user };
      }
    }
  }
  return unchainedContext;
};

export default (options = {}) => {
  startPlatform({
    introspection: true,
    cacheControl: false,
    corsOrigins: true,
    playground: true,
    typeDefs: [...typeDefs],
    resolvers: [resolvers],
    context,
    rolesOptions,
    ...options,
  });
};
