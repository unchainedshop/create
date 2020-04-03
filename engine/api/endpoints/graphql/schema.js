import { WorkerDirector } from 'meteor/unchained:core-worker';

export default [
  /* GraphQL */ `
    extend type SimpleProduct {
      ingredients: String
    }

    extend enum SearchOrderBy {
      price_DESC
      price_ASC
    }

    extend enum WorkType {
      ${WorkerDirector.getActivePluginTypes().join(',')}
    }
  `,
];
