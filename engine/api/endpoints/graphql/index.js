import { startPlatform } from 'meteor/unchained:platform';

import typeDefs from './schema';
import resolvers from './resolvers';

export default (options = {}) => {
  startPlatform({
    introspection: true,
    typeDefs: [...typeDefs],
    resolvers: [resolvers],
    ...options,
  });
};
