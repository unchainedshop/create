import { useMutation, useApolloClient, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import CurrentUserFragment from '../fragments/CurrentUserFragment';
import { UserQuery } from './useUser';

const CreateUserMutation = gql`
  mutation createUser(
    $username: String
    $email: String!
    $password: String!
    $profile: UserProfileInput
    $forceLocale: String
  ) {
    createUser(
      username: $username
      email: $email
      plainPassword: $password
      profile: $profile
    ) {
      id
      token
      tokenExpires
      user {
        ...CurrentUserFragment
      }
    }
  }
  ${CurrentUserFragment}
`;

const useCreateUser = () => {
  const intl = useIntl();
  const client = useApolloClient();
  const [createUserMutation, { error }] = useMutation(CreateUserMutation, {
    update(cache, result) {
      const newUser = result?.data?.createUser?.user;

      if (newUser) {
        cache.writeQuery({
          query: UserQuery,
          data: { me: newUser },
        });
      }
    },
  });

  const createUser = async ({ username, email, password, profile }) => {
    try {
      const result = await createUserMutation({
        variables: {
          username,
          email,
          password,
          profile,
          forceLocale: intl.locale,
        },
      });
      await client.resetStore();
      return result;
    } catch (e) {
      return '';
    }
  };

  return {
    createUser,
    error,
  };
};

export default useCreateUser;
