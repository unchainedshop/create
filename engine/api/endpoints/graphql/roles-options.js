export default {
  additionalRoles: {
    employee(role, actions) {
      role.allow(actions.viewOrders, () => true);
      role.allow(actions.viewOrder, () => true);
    },
  },
};
