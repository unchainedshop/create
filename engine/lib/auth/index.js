import { Users } from 'meteor/unchained:core-users';

export default ({ adminAccessKey }) => {
  // Users.simpleSchema().extend({
  //   custom: { type: Object, blackbox: true },
  // });

  Users.update(
    { username: 'admin' },
    {
      $set: {
        'services.token': {
          secret: adminAccessKey,
        },
      },
    },
  );
};
