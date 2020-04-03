// import { acl, roles } from 'meteor/unchained:api';
// const { checkResolver } = acl;
// const { actions } = roles;

export default {
  Mutation: {},
  Query: {},
  SimpleProduct: {
    ingredients({ meta = {} }) {
      return meta?.ingredients;
    },
  },
};
