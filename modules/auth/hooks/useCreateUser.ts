import { useMutation, useApolloClient, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import CurrentUserFragment from '../fragments/CurrentUserFragment';
import { UserQuery } from './useUser';

const CreateUserMutation = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $profile: UserProfileInput
    $forceLocale: String
  ) {
    createUser(email: $email, plainPassword: $password, profile: $profile) {
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
  const [createUserMutation, { error, loading }] = useMutation(
    CreateUserMutation,
    {
      update(cache, result) {
        const newUser = result?.data?.createUser?.user;

        if (newUser) {
          cache.writeQuery({
            query: UserQuery,
            data: { me: newUser },
          });
        }
      },
    },
  );

  const createUser = async ({ email, password, profile }) => {
    const result = await createUserMutation({
      variables: {
        email,
        password,
        profile,
        forceLocale: intl.locale,
      },
    });
    await client.resetStore();
    return result;
  };

  return {
    createUser,
    error,
    loading,
  };
};

export default useCreateUser;
