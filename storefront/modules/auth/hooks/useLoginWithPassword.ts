import { useMutation, useApolloClient, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import CurrentUserFragment from '../fragments/CurrentUserFragment';
import { UserQuery } from './useUser';

const LoginWithPasswordMutation = gql`
  mutation LoginWithPassword(
    $email: String!
    $password: String!
    $forceLocale: String
  ) {
    loginWithPassword(email: $email, plainPassword: $password) {
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

const useLoginWithPassword = () => {
  const client = useApolloClient();
  const intl = useIntl();
  const [loginWithPasswordMutation, { error }] = useMutation(
    LoginWithPasswordMutation,
    {
      update(cache, result) {
        const newUser = result?.data?.loginWithPassword?.user;

        if (newUser) {
          cache.writeQuery({
            query: UserQuery,
            data: { me: newUser },
          });
        }
      },
    },
  );

  const loginWithPassword = async ({ email, password }) => {
    const result = await loginWithPasswordMutation({
      variables: { email, password, forceLocale: intl.locale },
    });
    await client.resetStore();
    return result;
  };

  return {
    loginWithPassword,
    error,
  };
};

export default useLoginWithPassword;
