export default [
  /* GraphQL */ `
    extend type SimpleProduct {
      ingredients: String
    }

    extend enum SearchOrderBy {
      price_DESC
      price_ASC
    }
  `,
];
