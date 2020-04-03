import { Users } from 'meteor/unchained:core-users';

export default (token) => {
  const [username, accessKey] = token.split(':');
  return Users.findOne({ username, 'services.token.secret': accessKey });
};
