import { startPlatform } from 'meteor/unchained:platform';

import typeDefs from './schema';
import resolvers from './resolvers';

export default async (options = {}) => {
 await startPlatform({
    typeDefs: [...typeDefs],
    resolvers: [resolvers],
    ...options,
  });
};
